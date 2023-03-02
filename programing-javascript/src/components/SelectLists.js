export default function SelectLists({target, initialState}) {
    this.element = document.createElement('div'); //div 태그 생성
    this.element.className ="selectlists" 
    target.appendChild(this.element); // app에 div태그 추가
    this.state = { //SelectLists 상태관리
        selects : initialState
    }
    this.setState = (newState) => { //업데이트
        console.log(1123123)
        this.state = {
            selects: newState
        };
        console.log(this.state)
        this.render(); //업데이트 후 render 호출
    }
    this.render = () => {
        const {selects = [] } = this.state; //상태 구조분해
        console.log(selects)
        this.element.innerHTML = `
        <ul>
            ${selects.map(list=>`<li>${list}</li>`).join('')}
        </ul>
        `;// 
    }
    this.render() // 호출
}