# Building Matterfront

Matterfront builds are executed by a given set of heirarchical config values, with
a order of precedence. In the list below, the order of precedence increases as
you move down the list.

- `$HOME/.matterfront`
- `$cwd/.matterfront`
- CLI

If a config is not present in a higher order config, but exists in a lower order
config, then it will be inherited, unless the inherit property or flag is used
within the given config.

Filesystem based configs are formatted as `json` files. For example:

```js
{
  environments:[
    "local":{
      host:"http://192.168.33.33"
      icon:"resource/icon.png"
    },
    "test":{
      inherit: "local", // takes either a string of another env, or a boolean
      host: "https://my.test.mattermost.com"
    },
    "prod":{
      inherit:true
    }
  ],
  globals:{
    proxy:"http://proxy.host.com:port"
  }    
}
```

## Using the CLI

```
matterfront build [options]
```

CLI Options

```
-h  --host            Set the host (or hosts using hostname,hostname)
-e  --environment     Set the name of the environment
-p  --proxy           Set the proxy to use
-d  --deploy          Deploys the built artifacts to the configured server
-I  --no-inherit      Will not inherit from heirarchical configs
-c  --config-file     Specifies a config file to load from, defaults to ./.matterfront
```
