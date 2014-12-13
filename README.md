# s3-backed npmE auth

npmE authorization via s3 bucket permissions:

* you login to npmE using your s3 access key.
* you can publish modules if you have write access for the bucket.
* you can install modules if you have read access for the bucket.

## Getting Started

An auth-strategy is published as an npm module. Your package should contain the following files:

* **awsss.js:** the main entry point for a plugin.

## Publishing and Installing Your Auth-Plugin

1. install your auth-plugin, `cd /etc/npme; npm install npme-auth-s3`.

2. edit your npm Enterprise server's configuration to reference the custom plugin:

```json
{
  "args": {
    "--authentication-method": "s3",
    "--authorization-method": "s3",
    "--session-handler": "redis"
  }
}
```

3. regenerate npmE's run-scripts and restart npme, `npme generate-scripts; npme restart`.

## Some Examples of Auth-Plugins

The boilerplate code used in this post is taken from the [npme-auth-foo](https://github.com/bcoe/npme-auth-foo) auth-strategy.

For a more thorough working example, check out the [npme-auth-github](https://github.com/npm/npme-auth-github) auth strategy. This is default auth approach currently used by npm Enterprise.
