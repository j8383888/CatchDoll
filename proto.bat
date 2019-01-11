cd Egret
call pb-egret generate
cd ../Nodejs/protobuf
call pbjs -t static-module -w commonjs -o common.js common.proto
call pbts -o common.d.ts common.js
pause