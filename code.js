let modal = document.getElementById('my_modal');
let imgs_arr = document.getElementsByClassName('img');
let date_arr = document.getElementsByClassName('date');
let text_arr = document.getElementsByClassName('text');
document.getElementsByClassName('close_btn')[0].addEventListener('click',close_modal);
let index = 0;
for (let i = 0; i < imgs_arr.length; i++){
  imgs_arr[i].addEventListener('click', function(){
    index = i;
    console.log(JSON.parse(xhr.responseText)[i].id);
    var xhr_1 = new XMLHttpRequest();
    xhr_1.open(
      'GET', 
      'https://boiling-refuge-66454.herokuapp.com/images' + '/' + JSON.parse(xhr.responseText)[i].id, 
      true
    );
    xhr_1.send();
    xhr_1.onreadystatechange = function(){
      if (xhr_1.readyState !== 4) return;
      if (xhr_1.status === 200){
        let comment_obj = JSON.parse(xhr_1.responseText).comments;
        console.log('result', JSON.parse(xhr_1.responseText).comments);
        if (comment_obj.length !== 0){
          console.log(comment_obj[0].date);
          console.log(comment_obj[0].text);
          show_modal(JSON.parse(xhr_1.responseText).url, comment_obj[0].text, comment_obj[0].date);
        } else show_modal(JSON.parse(xhr_1.responseText).url, 0, 0);
      } else console.log('err', xhr_1.responseText);
    }
  });
}

let selected_picture = document.getElementById('selected_picture');
let comment_div = document.getElementById('comment_text');
function show_modal(comment_img, comment_text, comment_date){
  modal.style.display = 'block';
  selected_picture.src = comment_img;
  if ((comment_text != 0) && (comment_date != 0)){
    let date = new Date(comment_date);
    console.log(date);
    let my_date = date_parse(date);
    let date_div = document.createElement("div");
    let text_div = document.createElement("div");
    comment_div.appendChild(date_div);
    date_div.insertAdjacentElement('afterend', text_div);
    date_div.className = "date";
    text_div.className = "text";
    date_div.innerHTML = my_date;
    text_div.innerHTML = comment_text;
  }
}

function close_modal(){
  modal.style.display = 'none';
  del_prev_comments();
}

var xhr = new XMLHttpRequest();
xhr.open(
  'GET', 
  'https://boiling-refuge-66454.herokuapp.com/images', 
  true
);
xhr.send();

xhr.onreadystatechange = function(){
  if (xhr.readyState !== 4) return;
  if (xhr.status === 200){
    console.log('result', JSON.parse(xhr.responseText));
    for (let i = 0; i < imgs_arr.length; i++){
      imgs_arr[i].src = JSON.parse(xhr.responseText)[i].url;
    }
  } else {
    console.log('err', xhr.responseText);
  }
}

let comment = document.getElementById('com');
document.getElementById('paste_comment').addEventListener('click', function(){
  let name_val = document.getElementById('name').value;
  let com_val = document.getElementById('com').value;
  if ((name_val.length != 0) && (com_val.length != 0) && 
    (/\S/.test(name_val)) && (/\S/.test(com_val))){
    document.getElementById('name').style.border = "1px solid #CCCCCC";
    document.getElementById('com').style.border = "1px solid #CCCCCC";

    let json = JSON.stringify({
      name: document.getElementById('name').value,
      comment: document.getElementById('com').value
    });

    console.log(json);
    var xhr_2 = new XMLHttpRequest();
    xhr_2.open(
      'POST', 
      'https://boiling-refuge-66454.herokuapp.com/images' + '/' + JSON.parse(xhr.responseText)[index].id + '/comments', 
      true
    );
    xhr_2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr_2.send(json);
    xhr_2.onreadystatechange = function(){
      if (xhr_2.readyState !== 4) return;
      if (xhr_2.status === 204){
        let now_date = new Date()
        add_comment(now_date, comment.value);
      } else {
        console.log('err', xhr_2.responseText);
      }
    }
  } else {
    if ((name_val.length == 0) || (!/\S/.test(name_val))) document.getElementById('name').style.border = "1px solid red";
    else document.getElementById('name').style.border = "1px solid #CCCCCC";
    if ((com_val.length == 0) || (!/\S/.test(com_val))) document.getElementById('com').style.border = "1px solid red";
    else document.getElementById('com').style.border = "1px solid #CCCCCC";
  }
});

function date_parse(date){
  console.log(date); 
  let my_date = date.getDate();
  if (my_date < 10){
    my_date = '0' + my_date + '.';
  } else my_date += '.';
  if (date.getMonth() + 1 < 10){
    my_date = my_date + '0' + (date.getMonth() + 1) + '.';
  } else my_date += (date.getMonth() + 1) + '.';
  my_date = my_date + date.getFullYear();
  return my_date;
}

function add_comment(date, text){
  if (text.length != 0){
    let my_date = date_parse(date);
    let date_div = document.createElement("div");
    let text_div = document.createElement("div");
    comment_div.appendChild(date_div);
    date_div.insertAdjacentElement('afterend', text_div);
    date_div.className = "date";
    text_div.className = "text";
    date_div.innerHTML = my_date;
    text_div.innerHTML = text;
  } 
}

let parent = document.getElementById("comment_text");
function del_prev_comments(){
  let node = parent;
  while (node.firstChild) node.removeChild(node.firstChild);
  document.getElementById('com').value = '';
  document.getElementById('name').value = '';
}