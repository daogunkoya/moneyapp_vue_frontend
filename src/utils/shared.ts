export const textLimit = (text, maxLength):string=>{
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength) + '...';
        }

}