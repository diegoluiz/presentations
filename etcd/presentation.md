---
title: etcd presentation
author: Diego Luiz
patat:
  slideLevel: 1
  wrap: true
  margins:
    left: 10
    right: 10
  theme:
    header: [vividWhite, onVividBlack, bold]
    code: [dullBlack,onDullWhite]
    codeBlock: [dullBlack,onDullWhite]
    emph: [vividGreen, italic]
    strong: [vividRed, bold]
...

# etcd overview

<!--
Note: from coreos website:
The name "etcd" originated from two ideas, the unix "/etc" folder and "d"istibuted systems. The "/etc" folder is a place to store configuration data for a single system whereas etcd stores configuration information for large scale distributed systems. Hence, a "d"istributed "/etc" is "etcd".

etcd is designed as a general substrate for large scale distributed systems. These are systems that will never tolerate split-brain operation and are willing to sacrifice availability to achieve this end. etcd stores metadata in a consistent and fault-tolerant way. An etcd cluster is meant to provide key-value storage with best of class stability, reliability, scalability and performance.

Distributed systems use etcd as a consistent key-value store for configuration management, service discovery, and coordinating distributed work. Many organizations use etcd to implement production systems such as container schedulers, service discovery services, and distributed data storage. Common distributed patterns using etcd include leader election, distributed locks, and monitoring machine liveness.
-->

## Topics
  * what is (and what is not)
  * how to use
  * CLIs
  * how to setup 


# summary

  * from *coreos*
  * distributed *key-value* store
  * uses "folder structure" to store
  * open source (Apache v 2.0)
  * reliable
  * fast (like, really fast: https://coreos.com/etcd/docs/latest/op-guide/performance.html )
  * easy to use
  * github: https://github.com/etcd-io/etcd

. . .

## what is good for

  * application configurations
  * feature flag storage
  * distributed locking system
  * master elections

. . .

## what is not good for

  * redis / memcache
    * or any cache system
  * database

. . .

## comparison

| | ETCD | ZOOKEEPER | CONSUL | NEWSQL |
| --- | --- | --- | --- | --- |
| Concurrency Primitives | Lock RPCs, Election RPCs, ... | External curator recipes | Native lock API | Rare, if any |
| Linearizable Reads | Yes | No | Yes | Sometimes |
| Multi-version Concurrency Control | Yes | No | No | Sometimes |
| *Transactions* | Field compares, Read, Write | Version checks, Write | Field compare, Lock, Read, Write | SQL-style |
| *Change Notification* | Historical and current key intervals | Current keys and directories | Current keys and prefixes | Triggers |
| *User permissions* | Role based | ACLs | ACLs | Varies |
| *HTTP/JSON API* | Yes | No | Yes | Rarely |
| Membership Reconfiguration | Yes | >3.5.0 | Yes | Yes |
<!-- | Maximum reliable database size | Several gigabytes | Hundreds of megabytes | Hundreds of MBs | Terabytes+ | -->
<!-- | Minimum read linearization latency | Network RTT | No read linearization | RTT + fsync | Clock barriers | -->
<!-- Commented until I know more about the topics -->

source: https://coreos.com/etcd/docs/latest/learning/why.html


# how to use

 * can be used from lib within the code
 * CLIs on shells
 * REST Api


# CLIs

## Insert

`$ etcdctl put foo bar`

. . .

## Get

`$ etcdctl get foo` # single

`$ etcdctl get foo foo3` # range

`$ etcdctl get --prefix foo` # prefix

`$ etcdctl get --from-key b` # greater than key

. . .

## Update

same as **insert** (upinsert)

. . .

## Delete

same as **get** command, but with **del** instead

. . .

## Watch

Gets notification when a key changes. Same as **get** command, but with **watch** instead

# REST requests

## Insert
```
curl http://127.0.0.1:2379/v2/keys/message -XPUT -d value="Hello world"
{
  "action": "set",
  "node": { "createdIndex": 2, "key": "/message", "modifiedIndex": 2, "value": "Hello world" }
}
```

## Get

```
curl http://127.0.0.1:2379/v2/keys/message
{
  "action": "get",
  "node": { "createdIndex": 2, "key": "/message", "modifiedIndex": 2, "value": "Hello world" }
}
```


## Update

```
curl http://127.0.0.1:2379/v2/keys/message -XPUT -d value="Hello etcd"
{
    "action": "set",
    "node": { "createdIndex": 3, "key": "/message", "modifiedIndex": 3, "value": "Hello etcd" },
    "prevNode": { "createdIndex": 2, "key": "/message", "value": "Hello world", "modifiedIndex": 2 }
}
```

<!-- # REST requests -->

## Delete

`curl http://127.0.0.1:2379/v2/keys/message -XDELETE`
```
{
  "action": "delete",
  "node": { "createdIndex": 3, "key": "/message", "modifiedIndex": 4 },
  "prevNode": { "key": "/message", "value": "Hello etcd", "modifiedIndex": 3, "createdIndex": 3 }
}
```

## TTL Operations

### Set
`curl http://127.0.0.1:2379/v2/keys/foo -XPUT -d value=bar -d ttl=5`

### Unset
`curl http://127.0.0.1:2379/v2/keys/foo -XPUT -d value=bar -d ttl= -d prevExist=true`

### Watches

`curl http://127.0.0.1:2379/v2/keys/foo -XPUT -d value=bar -d ttl=5` *notifies watchers*

`curl http://127.0.0.1:2379/v2/keys/foo -XPUT -d ttl=5 -d refresh=true -d prevExist=true` *dont notify watchers*

# how to setup 

Download and run.

. . .

Done

. . .

## As a cluster

Not as simple. 

  * still download and run
  * and connect to the other hosts, but you need to know their IPs during the startup
  * or use a discovery service

. . .

  * you can use ETCD!

. . .

  * etcd → etcd → etcd → etcd
  * ..↑...................↓
  * ..↑←←←←←←←←←←←←←←←←←←←←

. . .

**etc.io** has a service you can use:

```
ETCD_DISCOVERY=`curl https://discovery.etcd.io/new?size=3\`
```

. . .

For new machines added, you need to register them in the cluster using the runtime reconfiguration.

From the new machine: `etcdctl member add new-machine-name http://10.0.0.10:2380`

. . .

No demo as I haven't built this yet :( 

# Thanks 

_Questions ?_
