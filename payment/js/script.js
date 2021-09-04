function checkForm() {
    var form = document.priceForm;
    if(form.username.value == "") {
      alert('이름을 입력하시오');
      form.username.focus();
      return false;
    }
    if(form.email.value == "") {
      alert('이메일을 입력하세요');
      form.email.focus();
      return false;
    } else {
      let pos = form.email.value.indexOf('@');
      let cnt = 0;
      let ok = true;
      while(pos !== -1) {
        cnt++;
        pos = form.email.value.indexOf('@', pos+1);
      }
      if(cnt != 1) {
        ok = false;
      }
      if(form.email.value.indexOf('.') < 0) {
        ok = false;
      }
      if(ok == false) {
          alert('잘못된 양식입니다.');
          form.email.value = '';
          form.email.focus();
          return false;
        
      }
    }
    if(form.zipcode.value == "") {
      alert('우편번호를 입력하시오');
      form.zipcode.focus();
      return false;
    }
    if(form.cardname.value == "") {
      alert('결제자이름을 입력하세요');
      form.cardname.focus();
      return false;
    }
    if(form.expyear.value == "") {
      alert('CVV를 입력하세요');
      form.expyear.focus();
      return false;
    } else {
        if(isNaN(form.expyear.value)) {
          alert('CVV는 숫자만 입력 가능합니다.');
          form.expyear.focus();
          return false;
        }
      }
    if(form.pass.value == "") {
      alert('비밀번호 뒤 두자리를 입력하세요');
      form.pass.focus();
      return false;
    } else {
      if(isNaN(form.pass.value)) {
        alert('비밀번호는 숫자만 입력 가능합니다.');
        form.pass.focus();
        return false;
      }
    }
  }

function showcard() {
    let list = document.getElementsByName('card');
    for(let i = 0; i < list.length; i++) {
        if(list[i].checked) {
            document.getElementById('card-name').innerHTML = list[i].value;
        }
    }
}

// 다음주소 API
function postCode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
  
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수
  
            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }
  
            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                // document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                // document.getElementById("sample6_extraAddress").value = '';
            }
            
  
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('zipcode').value = data.zonecode;
            document.getElementById("address1").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("address2").focus();
        }
    }).open();
  }
