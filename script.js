var val_name = document.getElementById('name');
var val_email = document.getElementById('email');
var val_phone = document.getElementById('phone');
var val_address = document.getElementById('address');
var val_state = document.getElementById('state');
var val_country = document.getElementById('country');
var val_btn = document.getElementById('btn');
var flag;
var myObj;
var table;
// reset button click
document.getElementById('btn2').addEventListener('click',function(){
    document.getElementById("myForm").reset();
});

// onclick submit button validate and calls the insert function
val_btn.addEventListener("click", submit);
function submit() {
flag=true;
var store=document.querySelectorAll('input[type="text"]');
   for(var val of store){
        var valid=document.getElementById("id"+val.getAttribute('id'));                
            if(val.value==""){
                flag=false;    
                    if(!valid){
                            val.insertAdjacentHTML('afterend','<p style="color:red" id="id'+val.getAttribute('id')+'">Please enter  '+val.getAttribute('id')+' field</p>');
 
                        }
                } else {
                    if(valid) {  valid.remove();}
                    }
            }
                insert(flag);
}

// Display table with json values when page get loaded
function createTable(val){
    // looping through key values with in the @localStorage
    var len = localStorage.length;
    //alert(len);
    for(var j = 0; j < len; j++) {
        var keyval = localStorage.key(i);
        console.log(keyval);
        // if keyvalue is matched to @myObj then loop through that object
        if(keyval=='myObj'){
            myObj = JSON.parse(localStorage.getItem(keyval));
            
            console.log("object itself:");
            console.log(myObj);
            console.log('length of object:'+myObj.length);
            for(var i = val;i<myObj.length;i++){
                console.log(i);
               
                        table = document.getElementById("myTable");
                        
                        var row = table.insertRow(-1);
                        row.id = 'myrow'+i;
                        var row2 = table.insertRow(-1);
                        //row2.id2 = 'detailed_info'+i;
                       // console.log(row.id);
                        //console.log(document.getElementById('row'+id));
                        var name = row.insertCell(0);
                        name.id = 'name'+i;
                        var email = row.insertCell(1);
                        email.id = 'email'+i;
                        var phone = row.insertCell(2);
                        phone.id = 'phone'+i;
                        var address = row.insertCell(3);
                        address.id = 'address'+i;
                        var view = row.insertCell(-1);
                        var update = row.insertCell(-1);
                        var dele = row.insertCell(-1);
                document.getElementById('name'+i).innerHTML = myObj[i].name;
                document.getElementById('email'+i).innerHTML = myObj[i].email;
                document.getElementById('phone'+i).innerHTML = myObj[i].phone;
                document.getElementById('address'+i).innerHTML = myObj[i].address;
                        view.innerHTML='<input type="button" id="view'+i+'" value="view" onclick="view('+i+')"/>';
                        update.innerHTML='<input type="button" id="update'+i+'" value="update" onclick="update('+i+')"/>';
                        dele.innerHTML='<input type="button" id="dele'+i+'" value="delete" onclick="dele('+i+')"/>';
                        row2.innerHTML='<div id="detailed_info'+i+'"></div>';
            } 
        }
      }   
    }

// inserting row after clicking submit button
function insert(flag){
if(flag) {
            myObj = JSON.parse(localStorage.getItem('myObj'));
            var newObj = {"name":val_name.value,"email":val_email.value,"phone":val_phone.value,"address":val_address.value,"state":val_state.value,"country":val_country.value};
            myObj.push(newObj);
            localStorage.setItem('myObj', JSON.stringify(myObj));
            createTable(myObj.length-1);
            document.getElementById("myForm").reset();
            document.getElementById('formid').style.display = 'none';
        }
}

if(!localStorage.getItem('myObj') || JSON.parse(localStorage.getItem('myObj')).length==0) {
//Ajax request to get fired
var xhttp=new XMLHttpRequest();
xhttp.open('GET', 'sample.json');
xhttp.onreadystatechange = function(){
  if(this.readyState==4 && this.status==200){
      //checked for the availability of localStorage and storing the parsed data
      if(typeof(Storage)!==undefined){
          myObj = JSON.parse(this.responseText);// getting a json data from the sample.json and parsing it
            
                localStorage.setItem('myObj', JSON.stringify(myObj));
             createTable(0);
        
      }
      
  }   
}
xhttp.send();
    
    }
else {
   
    createTable(0);
    
}



function popup(){
    //console.log('hi');
    //alert('clicked');
   document.getElementById('formid').style.display = 'block'; 
    jQuery('#btn').css("display", "block");
    jQuery('#update').css("display", "none");
   document.getElementById("myForm").reset();
}

function closem(){
    document.getElementById("myForm").reset();
    //valid.remove();
    document.getElementById('formid').style.display = 'none';
    //jQuery('#cancel').hide();
    //alert('click');
}

/*function view(i){
    //alert("clicked "+i);
    //$('detailed_info'+i).html(i am here);
   /* $('detailed_info'+i).toggle();
    myObj = JSON.parse(localStorage.getItem('myObj'));
    for(val in myObj){
    $('detailed_info'+i).html(myObj[val]);
    $('.detailed_info').css({"background-color": "yellow"});
}*/

function update(i){
   //alert('clicked'+i);
    popup();
    //jQuery('#btn').val('Update');
    jQuery('#btn').css("display", "none");
    jQuery('#update').css("display", "block");
    jQuery('#name').val(myObj[i].name);
    jQuery('#email').val(myObj[i].email);
    jQuery('#phone').val(myObj[i].phone);
    jQuery('#address').val(myObj[i].address);
    jQuery('#state').val(myObj[i].state);
    jQuery('#country').val(myObj[i].country);
    jQuery('#update').click(function(){
        
        myObj = JSON.parse(localStorage.getItem('myObj'));
        myObj[i].name = jQuery('#name').val();
        myObj[i].email = jQuery('#email').val();
        myObj[i].phone = jQuery('#phone').val();
        myObj[i].address = jQuery('#address').val();
        myObj[i].state =  jQuery('#state').val();
        myObj[i].country =  jQuery('#country').val();
        if(myObj[i].name && myObj[i].email && myObj[i].phone && myObj[i].address && myObj[i].state && myObj[i].country){
        localStorage.setItem('myObj', JSON.stringify(myObj));
       
                document.getElementById('name'+i).innerHTML = myObj[i].name;
                document.getElementById('email'+i).innerHTML = myObj[i].email;
                document.getElementById('phone'+i).innerHTML = myObj[i].phone;
                document.getElementById('address'+i).innerHTML = myObj[i].address;
                document.getElementById("myForm").reset();
                console.log(document.getElementById('myrow'+i));
                document.getElementById('formid').style.display = 'none';

        }else{
            
                //submit();

            }
    });
}

function dele(i){

    //jQuery('#myrow'+i).remove();
    console.log('without parsing');
    console.log(localStorage.getItem('myObj'));
     myObj = JSON.parse(localStorage.getItem('myObj'));
    console.log('before slicing'); 
    console.log(myObj);
     myObj.splice(i,1);
     console.log('after slicing');
     console.log(myObj);
     //jQuery('#myrow'+i).remove();
      $('#myTable tr[id^="myrow"]').remove();

     localStorage.setItem('myObj', JSON.stringify(myObj));
    createTable(0);
}

$(function(){
 $('#search-criteria').keyup(function(){
 var val = $(this).val().toLowerCase();
 $('#myTable tr[id^="myrow"]').hide();
 $('#myTable tr[id^="myrow"]').each(function(){
 var text = $(this).text().toLowerCase();
 if(text.indexOf(val) != -1)
 {
 $(this).show();
 }
 });
 });
});