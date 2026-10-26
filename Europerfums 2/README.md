# Europerfumes Guadalajara

Tienda en línea de fragancias creada con Next.js, React y TypeScript.

## Requisitos

- Node.js 20.9 o posterior
- npm

## Instalar y ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comprobaciones

```bash
npm run typecheck
npm run build
```

## Publicar en GitHub

1. Crea un repositorio vacío en GitHub. No agregues README, licencia ni `.gitignore`, porque ya están en este proyecto.
2. En la terminal, entra a la carpeta del proyecto y ejecuta estos comandos. Sustituye `TU-USUARIO` por tu usuario de GitHub:

```bash
cd Europerfums
git init
git add .gitignore README.md package.json package-lock.json tsconfig.json next-env.d.ts app public
git commit -m "Publica tienda Europerfumes Guadalajara"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/europerfumes-guadalajara.git
git push -u origin main
```

El inventario original en Excel no forma parte del proyecto. Evita subirlo a un repositorio público: contiene costos y precios de mayoreo.
