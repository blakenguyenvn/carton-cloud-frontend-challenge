# README #
### Author: TuanNguyen ###
This README would normally document whatever steps are necessary to get your application up and running.

### Technologies ###

*TypeScript*
*ReactJS*
*SASS*
*Webpack*
*Material UI**
*PHP*

#### CLI Shortcuts
Some frequent commands have shortcuts in *Makefile*, which allow to use ```make <shrtct>```
instead of long command. See [Makefile](Makefile) content for full list of shortcuts.
Here are some of them:

**Install Make GNU:**
for MacOS: https://www.topbug.net/blog/2013/04/14/install-and-use-gnu-command-line-tools-in-mac-os-x/
for Linux: https://linuxhint.com/gnu-make-tutorial/

* **make server** - Run PHP APIs server on localhost: http://localhost:8000
* **make frontend** Install NPM packages and Start Webapp (http://localhost:8100/) (*See `Make start` below*)
* **make start** - bundles JavaScript, styles and images from source, and start
local dev server (http://localhost:8100/)

### Checkout private source
```bash
git clone git@github.com:tuannguyen91vn/carton-cloud-frontend-challenge.git
cd carton-cloud-frontend-challenge
make server
```
**(open new terminal tab)**
```bash
make all
```
