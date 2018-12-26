// course button 만들기
//button>PRE<br>3000</button>
function createCourseElement(course) {
    var button = document.createElement('BUTTON');
    button.innerHTML = course.name + '<br><br>' + course.price + '만원';
    return button;
}


//cart element만들기
/* <li>
    <span class= "name">PRE</span>
    <span class= "quantity">2</span>
    <span class= "price">6000</span>
</li> */
function createCartElement(item) { //item은 obj형식
    var li = document.createElement('LI');

    var spanName = document.createElement('SPAN');
    spanName.className = 'name';
    spanName.innerHTML = item.name;
    li.appendChild(spanName);

    var spanQuantity = document.createElement('SPAN');
    spanQuantity.className = 'quantity';
    spanQuantity.innerHTML = item.quantity;
    li.appendChild(spanQuantity);

    var spanPrice = document.createElement('SPAN');
    spanPrice.className = 'price';
    spanPrice.innerHTML = item.price + '만';
    li.appendChild(spanPrice);
    return li;
}


//course btn에 innerHTML넣고 <div id="course">에 child로 달아주기
//course btn 클릭시 renderCartHTML을 호출
function renderCourseHTML() {
    var elCourse = document.querySelector('#course'); //<div id="course">에 appendChild해주기 위함

    for (let i = 0; i < course.length; i++) { 
        var courseButton = createCourseElement(course[i]); //courseName과 price가 들어간 course button완성

        courseButton.onclick = function addToCart() { //course btn클릭시 addToCart()라는 event설정
            cart.push(course[i].id); //data.js의 cart라는 빈 arr에 클릭한 course의 id값 push

            renderCartHTML(); //click시 cart에 데이터를 render해줌
        }
        elCourse.appendChild(courseButton);
    }
}


//createCartElement의 인자로 넘겨줄 obj를 자료구조 변경을 통해 만들고
//createCartElement(item)의 값인 <li>들을 <ul id="cart">에 appendChild
//renderSubtotal을 호출하여 total값이 변하게 해줌
function renderCartHTML() {
    var elCart = document.querySelector('#cart');
    elCart.innerHTML = '';
  
    // 아래 자료 구조를 변경
    // ['Pre', 'Immersive', 'Immersive']
    // { Pre: 1, Immersive: 2}
    var quantityObj = cart.reduce(function(acc, item) { //item은 course 각각을 뜻함
        if(acc[item]) {
            acc[item] = acc[item] + 1;
        } else {
            acc[item] = 1; //init을 {}로 주고 item을 acc(obj)의 key로 준다
        }
        return acc; //e.f { Pre: 1, DataScience: 2}
    }, {});


    // 아래 자료 구조를 변경
    // { Pre: 1, Immersive: 2}
    // [{name:'PRE', quantity:1, price:3000}, {name:'IMMERSIVE', quantity:2, price:100000}]
    var cartElementArr = []; //total값 표시 + ceateCartElement의 인자로 cartElementArr내 각요소들(= obj형식)을 주기위함
    for (var id in quantityObj) { //var quantityObj = { Pre: 1, Immersive: 2}
        let course = getCourseById(id); //let course = { id: 'Pre', name: 'PRE', price: 3000 }
        cartElementArr.push({
            name: course.name,
            quantity: quantityObj[id],
            price: course.price * quantityObj[id]
        });
    }

    //var cartElementArr = [{name:'PRE', quantity:1, price:3000}, {name:'IMMERSIVE', quantity:2, price:100000}]
    cartElementArr.forEach(function(item) { //item = {name:'PRE', quantity:1, price:3000}
        var elList = createCartElement(item); 
        // <li>
        //     <span class= "name">PRE</span>
        //     <span class= "quantity">1</span>
        //     <span class= "price">3000</span>
        // </li> 
        elCart.appendChild(elList); //var elCart = <li id="cart"> </li>
    });

    renderSubtotalHTML(cartElementArr); //click event시 total도 바뀌어야하므로
}


// input: 'Pre'
// output: { id: 'Pre', name: 'PRE', price: 3000 }
function getCourseById(id) {
    var found = course.filter(function(item) {
        return item.id === id; //getCourseById의 인자와 일치하는 id를 가진 obj뽑아내기
    })
    return found[0]; //return 값은 obj. course에서 id와 일치하는 obj는 하나밖에 없음 e.f. id가 'Pre'인 obj는 {id: 'Pre', name: 'PRE', price: 3000}
}


// 인자arr는 cartElementArr = [{name:'PRE', quantity:1, price:3000}, {name:'IMMERSIVE', quantity:2, price:100000}]
function renderSubtotalHTML(arr) {
    var elSubtotal = document.querySelector('#subtotal span'); /* id를 가진 부모div 내 자식div, span들을 부를때 #id div/span */
    var total = arr.reduce(function(subtotal, cur) { /* subtotal내 child span의 innerHTML에 total을 주기위함 */
        return subtotal + cur.price;
    }, 0); /* 0원에서 시작하여 cur.price를 더해줌 */
    elSubtotal.innerHTML = total + '만';
}
  
renderCourseHTML();