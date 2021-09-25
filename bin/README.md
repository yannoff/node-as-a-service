# Entrypoint scripts

The `hode-helper` is intended as the entrypoint script (busy-box fashion), from the PHP container point of view.

All of the final `node`, `npm` or `yarn` scripts may be just bare symlinks to it.

For instance:

```bash
bash-5.1# ll /usr/bin/ | grep node-helper
lrwxrwxrwx    1 root     root            11 Sep 27 19:15 node -> node-helper
drwxr-xr-x    2 root     root          4096 Sep 27 19:15 node-helper
lrwxrwxrwx    1 root     root            11 Sep 27 19:15 npm -> node-helper
lrwxrwxrwx    1 root     root            11 Sep 27 19:15 yarn -> node-helper
```
