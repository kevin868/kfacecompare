(this.webpackJsonpkfacecompare=this.webpackJsonpkfacecompare||[]).push([[0],{32:function(e,t,s){},33:function(e,t,s){},34:function(e,t,s){},53:function(e,t,s){},56:function(e,t,s){"use strict";s.r(t);var n=s(0),i=s(3),a=s.n(i),r=s(5),l=s.n(r),o=(s(32),s(14)),c=s(23),u=s(8),d=s(9),h=s(10),p=s(12),f=s(11),m=(s(33),s(34),s(24)),j=s.n(m),b=s(26),g=s(4),x=(s(53),s(25)),O=s.p+"static/media/UploadIcon.469126df.svg",v={display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",width:"100%"},y="NOT_SUPPORTED_EXTENSION",F="FILESIZE_TOO_LARGE",I=function(e){Object(p.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(d.a)(this,s),(n=t.call(this,e)).state={pictures:Object(b.a)(e.defaultImages),files:[],fileErrors:[]},n.inputElement="",n.onDropFile=n.onDropFile.bind(Object(g.a)(n)),n.onUploadClick=n.onUploadClick.bind(Object(g.a)(n)),n.triggerFileUpload=n.triggerFileUpload.bind(Object(g.a)(n)),n}return Object(h.a)(s,[{key:"componentDidUpdate",value:function(e,t,s){t.files!==this.state.files&&this.props.onChange(this.state.files,this.state.pictures)}},{key:"componentWillReceiveProps",value:function(e){e.defaultImages!==this.props.defaultImages&&this.setState({pictures:e.defaultImages})}},{key:"hasExtension",value:function(e){var t="("+this.props.imgExtension.join("|").replace(/\./g,"\\.")+")$";return new RegExp(t,"i").test(e)}},{key:"onDropFile",value:function(e){for(var t=this,s=e.target.files,n=[],i=[],a=0;a<s.length;a++){var r=s[a],l={name:r.name};this.hasExtension(r.name)?r.size>this.props.maxFileSize?(l=Object.assign(l,{type:F}),i.push(l)):n.push(this.readFile(r)):(l=Object.assign(l,{type:y}),i.push(l))}this.setState({fileErrors:i});var o=this.props.singleImage;Promise.all(n).then((function(e){var s=o?[]:t.state.pictures.slice(),n=o?[]:t.state.files.slice();e.forEach((function(e){s.push(e.dataURL),n.push(e.file)})),t.setState({pictures:s,files:n})}))}},{key:"onUploadClick",value:function(e){e.target.value=null}},{key:"readFile",value:function(e){return new Promise((function(t,s){var n=new FileReader;n.onload=function(s){var n=s.target.result;n=n.replace(";base64",";name=".concat(e.name,";base64")),t({file:e,dataURL:n})},n.readAsDataURL(e)}))}},{key:"removeImage",value:function(e){var t=this,s=this.state.pictures.findIndex((function(t){return t===e})),n=this.state.pictures.filter((function(e,t){return t!==s})),i=this.state.files.filter((function(e,t){return t!==s}));this.setState({pictures:n,files:i},(function(){t.props.onChange(t.state.files,t.state.pictures)}))}},{key:"renderErrors",value:function(){var e=this;return this.state.fileErrors.map((function(t,s){return Object(n.jsxs)("div",{className:"errorMessage "+e.props.errorClass,style:e.props.errorStyle,children:["* ",t.name," ",t.type===F?e.props.fileSizeError:e.props.fileTypeError]},s)}))}},{key:"renderIcon",value:function(){if(this.props.withIcon)return Object(n.jsx)("img",{src:O,className:"uploadIcon",alt:"Upload Icon"})}},{key:"renderLabel",value:function(){if(this.props.withLabel)return Object(n.jsx)("p",{className:this.props.labelClass,style:this.props.labelStyles,children:this.props.label})}},{key:"renderPreview",value:function(){return Object(n.jsx)("div",{className:"uploadPicturesWrapper",children:Object(n.jsx)(x.a,{enterAnimation:"fade",leaveAnimation:"fade",style:v,children:this.renderPreviewPictures()})})}},{key:"renderPreviewPictures",value:function(){var e=this;return this.state.pictures.map((function(t,s){return Object(n.jsxs)("div",{className:"uploadPictureContainer",children:[Object(n.jsx)("div",{className:"deleteImage",onClick:function(){return e.removeImage(t)},children:"X"}),Object(n.jsx)("img",{src:t,className:"uploadPicture",alt:"preview"})]},s)}))}},{key:"triggerFileUpload",value:function(){this.inputElement.click()}},{key:"clearPictures",value:function(){this.setState({pictures:[]})}},{key:"render",value:function(){var e=this;return Object(n.jsx)("div",{className:"fileUploader "+this.props.className,style:this.props.style,children:Object(n.jsxs)("div",{className:"fileContainer",style:this.props.fileContainerStyle,children:[this.renderIcon(),this.renderLabel(),Object(n.jsx)("div",{className:"errorsContainer",children:this.renderErrors()}),Object(n.jsx)("button",{type:this.props.buttonType,className:"chooseFileButton "+this.props.buttonClassName,style:this.props.buttonStyles,onClick:this.triggerFileUpload,children:this.props.buttonText}),Object(n.jsx)("input",{type:"file",ref:function(t){return e.inputElement=t},name:this.props.name,multiple:!this.props.singleImage,onChange:this.onDropFile,onClick:this.onUploadClick,accept:this.props.accept}),this.props.withPreview?this.renderPreview():null]})})}}]),s}(a.a.Component);I.defaultProps={className:"",fileContainerStyle:{},buttonClassName:"",buttonStyles:{},withPreview:!1,accept:"image/*",name:"",withIcon:!0,buttonText:"Choose images",buttonType:"button",withLabel:!0,label:"Max file size: 5mb, accepted: jpg|gif|png",labelStyles:{},labelClass:"",imgExtension:[".jpg",".jpeg",".gif",".png"],maxFileSize:5242880,fileSizeError:" file size is too big",fileTypeError:" is not a supported file extension",errorClass:"",style:{},errorStyle:{},singleImage:!1,onChange:function(){},defaultImages:[]};var C=I;var N=function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"FaceCompare"}),Object(n.jsx)("div",{className:"intro",children:Object(n.jsxs)("div",{children:["Select 2 or 3 pictures of people to calculate how similar they are.",Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),"This tool uses dlib for face detection, and"," ",Object(n.jsx)("a",{href:"http://cmusatyalab.github.io/openface/",children:"OpenFace"})," pre-trained neural net models to compute a 128-dimensional face representation.",Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),"Privacy Note: Our server does not store any of the photos you submit."]})})]})},k=function(e){Object(p.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(d.a)(this,s),(n=t.call(this,e)).setIsLoading=function(e){var t={isLoading:e};!0===e&&(t.error=void 0),n.setState(t)},n.setError=function(e){n.setState({error:e||"Backend is down. It's Kevin's fault! Try again in 12 hours."})},n.fileChangedHandler=function(e){return function(t){console.log(e);var s="file".concat(e);n.setState(Object(u.a)({},s,t[0]));var i=t[0]&&t[0].name,a=i&&i.length>32?E(e):i;if(a){var r=n.state.fileToAliasMap||{};r[i]=a,n.setState({fileToAliasMap:r})}}},n.onUpdateName=function(e){return function(t){var s=Object(c.a)({},n.state.fileToAliasMap);s[n.getFilename(e)]=t.target.value,n.setState({fileToAliasMap:s})}},n.uploadHandler=function(){console.log(n.state);var e=new FormData;if(n.state.file1?e.append("imgs[]",n.state.file1,n.state.file1.name):console.log("Must select Image A"),n.state.file2?e.append("imgs[]",n.state.file2,n.state.file2.name):console.log("Must select Image B"),n.state.file3?e.append("imgs[]",n.state.file3,n.state.file3.name):console.log("Missing Image C, Proceeding"),console.log(e.getAll("imgs[]")),e.getAll("imgs[]").length<2)return n.setError("Please select at least 2 images to compare."),void n.scrollToBottom();n.setIsLoading(!0);j.a.post("https://0dcfd0ab0492.ngrok.io/post_imgs",e).then(n.onBackendResponse).catch((function(e){n.onBackendError(e)}))},n.onBackendResponse=function(e){console.log(e),n.setIsLoading(!1);var t=e.data.resultsArray;n.setState({results:t}),console.log(n.state),n.scrollToBottom()},n.onBackendError=function(e){n.setIsLoading(!1),n.setError(e.response&&e.response.data.error),n.scrollToBottom()},n.getFilename=function(e){var t="file".concat(e);return n.state[t]?n.state[t].name:null},n.getAliasFromFileIndex=function(e){return n.state.fileToAliasMap[n.getFilename(e)]},n.scrollToBottom=function(){n.bottom.scrollIntoView({behavior:"smooth"})},n.state={isLoading:!1,fileToAliasMap:{}},n}return Object(h.a)(s,[{key:"render",value:function(){var e,t=this,s=this.state.error?Object(n.jsxs)("div",{className:"errorMsg",children:[Object(n.jsxs)("h5",{children:["Error: ",this.state.error," "]}),(e=this.state.error,e&&e.startsWith("Unable to find a face")?Object(n.jsx)("h4",{className:"errorHint",children:"Hint: try a different photo and crop around the face."}):null)]}):null,i=function(e){return t.state.fileToAliasMap[e]||e};return Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"row",children:[Object(n.jsx)(S,{num:1,fileChangedHandler:this.fileChangedHandler,getFilename:this.getFilename,getAliasFromFileIndex:this.getAliasFromFileIndex,onUpdateName:this.onUpdateName(1)}),Object(n.jsx)(S,{num:2,fileChangedHandler:this.fileChangedHandler,getFilename:this.getFilename,getAliasFromFileIndex:this.getAliasFromFileIndex,onUpdateName:this.onUpdateName(2)}),Object(n.jsx)(S,{num:3,fileChangedHandler:this.fileChangedHandler,getFilename:this.getFilename,getAliasFromFileIndex:this.getAliasFromFileIndex,onUpdateName:this.onUpdateName(3)})]}),Object(n.jsx)("button",{className:"uploadFilesButton",onClick:this.uploadHandler,children:this.state.isLoading?"Loading ...":"Submit"}),s,Object(n.jsx)(T,{results:this.state.results,getAliasFromKey:i}),this.state.results?Object(n.jsx)("div",{className:"filename",children:"Raw Distances between Image Representations (Smaller is more similar)"}):null,Object(n.jsx)(w,{results:this.state.results,getAliasFromKey:i}),this.state.results?Object(n.jsx)("div",{className:"filename errorHint hintPadded",children:"Hint: Edit the person's name in the box (optional). This makes the tables easier to read!"}):null,Object(n.jsx)("div",{style:{float:"left",clear:"both"},ref:function(e){t.bottom=e}})]})}}]),s}(i.Component),E=function(e){return String.fromCharCode(64+e)},S=function(e){var t=e.num,s=e.fileChangedHandler,i=e.getFilename,a=e.getAliasFromFileIndex,r=e.onUpdateName;return Object(n.jsxs)("div",{className:"column",children:[Object(n.jsx)(C,{withIcon:!1,buttonText:"Choose Image ".concat(E(t)),onChange:s(t),withPreview:!0,imgExtension:[".jpg",".gif",".png",".jpeg"],maxFileSize:5242880,singleImage:!0}),Object(n.jsxs)("div",{className:"filename",children:[i(t),Object(n.jsx)("div",{children:Object(n.jsx)("input",{className:"fileRename",title:"(Optional) Type person's name",defaultValue:a(t),type:"text",onChange:r})})]})]})},w=function(e){var t=e.results,s=e.getAliasFromKey;return t?Object(n.jsx)("div",{children:Object(n.jsx)("table",{className:"summaryTable",children:Object(n.jsxs)("tbody",{children:[Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Face 1"}),Object(n.jsx)("th",{children:"Face 2"}),Object(n.jsx)("th",{children:"Distance"})]}),t.map((function(e){var t=Object(o.a)(e,3),i=t[0],a=t[1],r=t[2];return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:s(i)}),Object(n.jsx)("td",{children:s(a)}),Object(n.jsx)("td",{children:r})]})}))]})})}):null},T=function(e){var t=e.results,s=e.getAliasFromKey,i=function(e){return 1/(1+Math.pow(Math.E,2.8*(e-1.6)))},a=function(e){return Math.round(100*i(e)*10)/10};return t?Object(n.jsx)("div",{children:Object(n.jsx)("table",{className:"summaryTable",children:Object(n.jsxs)("tbody",{children:[Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Face 1"}),Object(n.jsx)("th",{children:"Face 2"}),Object(n.jsx)("th",{children:"Similarity"})]}),t.map((function(e){var t=Object(o.a)(e,3),r=t[0],l=t[1],c=t[2];return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:s(r)}),Object(n.jsx)("td",{children:s(l)}),Object(n.jsx)("td",{children:i(c)>.6?Object(n.jsxs)("b",{children:[a(c),"%"]}):"".concat(a(c),"%")})]})}))]})})}):null},A=function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)(N,{}),Object(n.jsx)(k,{})]})},P=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,57)).then((function(t){var s=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;s(e),n(e),i(e),a(e),r(e)}))};l.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(A,{})}),document.getElementById("root")),P()}},[[56,1,2]]]);
//# sourceMappingURL=main.381f4b55.chunk.js.map