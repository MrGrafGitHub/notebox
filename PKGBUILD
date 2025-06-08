# Maintainer: MrGraf <your-email@example.com>
pkgname=notebox
pkgver=1.0.0
pkgrel=1
pkgdesc="Markdown notes app with Python backend and React frontend"
arch=('x86_64')
url="https://github.com/MrGrafGitHub/notebox"
license=('MIT')
depends=('nodejs' 'npm' 'python' 'python-pip' 'python-flask' 'python-flask-cors')
makedepends=('npm' 'nodejs' 'python-pip')
source=(
  'linux/install.sh'
  'linux/notebox.desktop'
  'linux/icon.png'
)

prepare() {
  cp -r ../backend "$srcdir/backend"
  cp -r ../frontend "$srcdir/frontend"
}

package() {
  mkdir -p "$pkgdir/opt/notebox/backend"
  mkdir -p "$pkgdir/opt/notebox/frontend"

  rsync -a --exclude='__pycache__' --exclude='notes.db' "$srcdir/backend/" "$pkgdir/opt/notebox/backend/"
  cp -r "$srcdir/frontend/dist" "$pkgdir/opt/notebox/frontend/"

  install -Dm755 "$srcdir/linux/install.sh" "$pkgdir/usr/bin/notebox-install.sh"
  install -Dm644 "$srcdir/linux/notebox.desktop" "$pkgdir/usr/share/applications/notebox.desktop"
  install -Dm644 "$srcdir/linux/icon.png" "$pkgdir/usr/share/pixmaps/notebox.png"
}
