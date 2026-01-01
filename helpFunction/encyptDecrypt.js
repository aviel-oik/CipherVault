export function reverseEncryption(message) {
    let reversed = '';
    for (let i = message.length - 1; i >= 0; i--) {
        reversed += message[i];
    }
    return reversed.toUpperCase();
}

// I took this algorithm from Stack Overflow !!!
export function atbashEncryption(message) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    var decoded_string = "";

    for (i = 0; i < message.length; i++) {
        var coded_letter = message.charAt(i);
        var letter_index = alphabet.indexOf(coded_letter);
        var decoded_letter = tebahpla.charAt(letter_index);
        decoded_string = decoded_string + decoded_letter;
    }
    return decoded_string;
}