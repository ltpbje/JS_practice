let str = '';
let level = prompt('输入层数');
level = parseInt(level)&&Number(level);
if(isNaN(level))
{
    alert('输入必须是纯数字');
}
for(let i=1;i<=level;i++)
{
    let blank = level - i;
    for(let k=0;k<=blank;k++)
    {
        str += ' ';
    }
    let star = i * 2 - 1;
    for(let m=0;m<star;m++)
    {
        str += '*';
    }
    str += '\n';
}
console.log(str);