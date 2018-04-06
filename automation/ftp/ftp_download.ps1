function SendToEmail([string]$email, [string]$body, [string]$subject){
    $Username = "{email}";
    $Password= "{password}";
    
    $message = new-object Net.Mail.MailMessage;
    $message.From = "{email}";
    $message.To.Add(${email});
    $message.Subject = $subject;
    $message.Body = $body;

    $smtp = new-object Net.Mail.SmtpClient("smtp.gmail.com", "587");
    $smtp.EnableSSL = $true;
    $smtp.Credentials = New-Object System.Net.NetworkCredential($Username, $Password);
    $smtp.send($message);
    write-host "Mail Sent" ; 
    $attachment.Dispose();
 }

function DownloadHttpFile($url, $localFilePath){
    Write-Host $url to $localFilePath
    Invoke-WebRequest -Uri $url -OutFile $localFilePath
}

function DownloadFtpFile($url, $localFilePath) {
    Write-Host $url to $localFilePath
    $downloadRequest = [Net.WebRequest]::Create($url)
    $downloadRequest.Method = [System.Net.WebRequestMethods+FTP]::DownloadFile

    $downloadResponse = $downloadRequest.GetResponse()
    $sourceStream = $downloadResponse.GetResponseStream()
    $targetStream = [System.IO.File]::Create($localFilePath)
    $buffer = New-Object byte[] 10240
    while (($read = $sourceStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
        Write-Host "Downloading...."
        $targetStream.Write($buffer, 0, $read);
    }
    $targetStream.Dispose()
    $sourceStream.Dispose()
    $downloadResponse.Dispose()
}

function ListFtpDirectory($url) {
    $listRequest = [Net.WebRequest]::Create($url)
    $listRequest.Method = [System.Net.WebRequestMethods+FTP]::ListDirectoryDetails

    $lines = New-Object System.Collections.ArrayList

    $listResponse = $listRequest.GetResponse()
    $listStream = $listResponse.GetResponseStream()
    $listReader = New-Object System.IO.StreamReader($listStream)
    while (!$listReader.EndOfStream) {
        $line = $listReader.ReadLine()
        $lines.Add($line) | Out-Null
    }
    $listReader.Dispose()
    $listStream.Dispose()
    $listResponse.Dispose()

    $lines
}

# $today = Get-Date -Hour 0 -Minute 0 -Second 0
$today = Get-Date -Year 2015 -Month 9 -Day 1 -Hour 0 -Minute 0 -Second 0
$lastWeek = $today.AddDays(-3)

Write-Host "Processing on ", $today
Write-Host "Getting files for ", $lastWeek

$url = "ftp://ftp-trace.ncbi.nlm.nih.gov/1000genomes/ftp/data/" 


$downloadedFolders = @()
$downloadedFiles = @()
$expections = @()

foreach ($line in ListFtpDirectory($url)) { 
    try {
        $folderName = $line.Substring(63) #A21121
        $dateStr = $line.Substring(50, 12) # Jul 19  2015
        $date = [datetime]::ParseExact($dateStr, 'MMM d  yyyy', $null)

        if (($date -ge $lastWeek) -and ($date -lt $today)) {
            New-Item -ItemType directory -Path ("files\\" + $folderName) -Force
            $downloadedFolders += $folderName
            foreach ($file in ListFtpDirectory("$url$folderName/alignment/")) {
                if (!$file.EndsWith(".cram")) {
                    $fileName = $file.Substring($file.LastIndexOf(" ")).Trim()
                    $downloadedFiles += $fileName
                    $fileUrl = ("$url$folderName/alignment/$fileName").Replace("ftp://", "http://")
                    # DownloadHttpFile $fileUrl ("files\\$folderName\\$fileName")
                }
            }
        }
    }
    catch { 
        $expections += $_
        Write-Host $_.ToString()
    }
}

$body = "Downloaded folders`n $downloadedFolders `n Downloaded files `n $downloadedFiles Exceptions `n $expections"

Write-Host $body
SendToEmail  -email "{email}"  -body $body -subject "Processed files from $lastWeek to $today"
