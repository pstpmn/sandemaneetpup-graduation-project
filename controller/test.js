const vvv = async() => {
    setTimeout(() => {
        alert('C');
    }, 1000);
}

const bbb=async()=>{
    setTimeout(() => {
        alert('B');
    }, 2000);
}


async function aaa(){
    bbb();
    vvv();
}