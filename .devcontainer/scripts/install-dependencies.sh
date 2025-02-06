echo 'Installing API layer dependencies >>>'
cd api
mvn -B package

echo 'Installing latest version of Node 22 >>>'
cd ../web/
nvm install # nvm will install the node version required in the file ./nvmrc, which is node version 22

echo 'Installing WEB layer dependencies >>>'
npm install