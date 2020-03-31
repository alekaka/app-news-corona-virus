
export const TextExtractor = (text, start, length) => {
    var result = text.substr(start, length);
    result = result.trim();
    
    return result;
};