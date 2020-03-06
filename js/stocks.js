 var symbol = 'FB'; //Default, global

 function loadData() {
     // https://financialmodelingprep.com/developer/docs
     console.log(symbol);
     getRequest(
         'https://financialmodelingprep.com/api/v3/company/profile/' + symbol,
         drawOutput
     );
 }

 function drawOutput(responseText) {

     console.log(JSON.parse(responseText));

     let resp = [JSON.parse(responseText).profile];

     let $table = document.createElement("table");
     $table.className += " table";

     var elements = document.querySelectorAll('.stock-name')[0];

     let $head = document.createElement("thead");
     let $body = document.createElement("tbody");

     let $lineHader = document.createElement("tr");

     for (let i = 0; i < resp.length; i++) {
         let financial = resp[i];
         let $line = document.createElement("tr");


         for (var key in financial) {
             if (i === 0 && financial.hasOwnProperty(key)) {
                 let $ele = document.createElement("th");
                 $ele.textContent = key;
                 $lineHader.appendChild($ele);
             }
         }

         $head.appendChild($lineHader);
         $table.appendChild($head);

         for (var key2 in financial) {
             if (financial.hasOwnProperty(key2)) {
                 let $eletd = document.createElement("td");
                 let textValue = financial[key2];
                 
                 if (String(textValue).indexOf(".jpg") !== -1) {
                     
                     //console.log("View: " + textValue + " - " + (typeof textValue)); 
                     let imgLogo = new Image(); 
                     imgLogo.src = textValue;
                     $eletd.appendChild(imgLogo);
                     
                 } else {
                     $eletd.textContent = textValue;
                 }
                 
                 $line.appendChild($eletd);
             }
         }
         $body.appendChild($line)

         $table.appendChild($body);

     }

     document.body.appendChild($table);
 }

 function getRequest(url, success) {
     var req = false;
     try {
         req = new XMLHttpRequest();
     } catch (e) {
         try {
             req = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
             try {
                 req = new ActiveXObject("Microsoft.XMLHTTP");
             } catch (e) {
                 return false;
             }
         }
     }
     if (!req) return false;
     if (typeof success != 'function') success = function () {};
     req.onreadystatechange = function () {
         if (req.readyState == 4) {
             if (req.status === 200) {
                 success(req.responseText)
             }
         }
     }
     req.open("GET", url, true);
     req.send(null);
     return req;
 }

 function getStock() {
     symbol = document.getElementById("stockCode").value; //get input value

     loadData();
 }
