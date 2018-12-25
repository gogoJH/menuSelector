// 코스메뉴 버튼 만들기
//button>PRE<br>3000</button>
function createCourseElement(course) {
    var button = document.createElement('BUTTON');
    button.innerHTML = course.name + '<br><br>' + course.price + '만원';
    return button;
}


//cart list element만들기
/* <li>
    <span class= "name">PRE</span>
    <span class= "quantity">2</span>
    <span class= "price">6000</span>
</li> */
function createCartElement(item) {
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


//course button의 innerHTML 넣어주기
function renderCourseHTML() {
    var elCourse = document.querySelector('#course'); //<div id="course">에 appendChild해주기 위함

    for (let i = 0; i < course.length; i++) { 
        var courseButton = createCourseElement(course[i]); //courseName과 price가 들어간 course button완성

        courseButton.onclick = function addToCart() { //course btn클릭시 addToCart라는 event설정
            cart.push(course[i].id); //data.js의 빈 cart arr에 클릭한 course의 id값 담아주기

            renderCartHTML(); //자료구조를 id: quantity형식의 obj로 변경
        }
        elCourse.appendChild(courseButton);
    }
}


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
            acc[item] = 1; //init을 {}로 주고 arr안의 elems를 acc라 했을때 acc를 obj의 key로 준다
        }
        return acc; //{ Pre: 1, DataScience: 2}
    }, {});


    // 아래 자료 구조를 변경
    // { Pre: 1, Immersive: 2}
    // [{name:'PRE', quantity:1, price:3000}, {name:'IMMERSIVE', quantity:2, price:100000}]
    var cartElementArr = []; //total값 표시 + ceateCartElement(cartElementArr내 각요소들(= obj형식)) 하기 위함
    for (var id in quantityObj) { //
        let course = getCourseById(id); //let course = { id: 'Pre', name: 'PRE', price: 3000 }
        cartElementArr.push({
            name: course.name,
            quantity: quantityObj[id],
            price: course.price * quantityObj[id]
        });
    }

    renderSubtotalHTML(cartElementArr);

    //var cartElementArr = [{name:'PRE', quantity:1, price:3000}, {name:'IMMERSIVE', quantity:2, price:100000}]
    cartElementArr.forEach(function(item) { //item = {name:'PRE', quantity:1, price:3000}
        var elItem = createCartElement(item); 
        // <li>
        //     <span class= "name">PRE</span>
        //     <span class= "quantity">1</span>
        //     <span class= "price">3000</span>
        // </li> 
        elCart.appendChild(elItem); //var elCart = <li id="cart"> </li>
    });
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