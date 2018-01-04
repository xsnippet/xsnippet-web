const regExpEscape = string => string.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&');

export default regExpEscape;
