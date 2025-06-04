npx sequelize-cli model:generate --name File --attributes \
token:string,\
code:string,\
filename:string,\
original:string,\
note:text,\
recipientEmail:string,\
expiresAt:date,\
downloaded:boolean,\
uploaderIP:string,\
uploaderUA:string,\
uploaderRefer:string,\
uploaderOrigin:string,\
uploaderLang:string

npx sequelize-cli model:generate --name Download --attributes \
fileId:string,\
ip:string,\
ua:string,\
refer:string,\
origin:string,\
lang:string
