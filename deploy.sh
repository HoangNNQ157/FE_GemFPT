echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r -i C:/hoang dist/* root@143.198.92.27:/var/www/html/
echo "Done!"