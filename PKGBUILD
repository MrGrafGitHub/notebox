pkgname=notebox
pkgver=1.0.0
pkgrel=1
pkgdesc="Markdown notes app with Python backend and React frontend"
arch=('x86_64')
url="https://github.com/MrGrafGitHub/notebox"
license=('MIT')

depends=('python' 'python-pip' 'python-flask' 'python-flask-cors' 'nodejs')  # npm не runtime, но nodejs нужен для запуска backend
makedepends=('npm' 'nodejs' 'python-pip')

source=(
  'install.sh'
  'notebox.desktop'
  'icon.png'
)

noextract=('install.sh' 'notebox.desktop' 'icon.png')

prepare() {
  cp -r ../backend "$srcdir/backend"
  cp -r ../frontend "$srcdir/frontend"
}

build() {
  cd "$srcdir/frontend"
  npm install
  npm run build
}

package() {
  mkdir -p "$pkgdir/opt/notebox/backend"
  mkdir -p "$pkgdir/opt/notebox/frontend"

  rsync -a --exclude='__pycache__' --exclude='notes.db' "$srcdir/backend/" "$pkgdir/opt/notebox/backend/"
  cp -r "$srcdir/frontend/dist" "$pkgdir/opt/notebox/frontend/"

  install -Dm755 "$srcdir/install.sh" "$pkgdir/usr/bin/notebox-install.sh"
  install -Dm644 "$srcdir/notebox.desktop" "$pkgdir/usr/share/applications/notebox.desktop"
  install -Dm644 "$srcdir/icon.png" "$pkgdir/usr/share/pixmaps/notebox.png"
}
