import { format } from 'date-fns';

export function dateToString(date){
    if(!date){ return ''; } //dateがなかったら、空白を返す
    return format(date, 'yyyy年M月d日 HH時mm分');
}
