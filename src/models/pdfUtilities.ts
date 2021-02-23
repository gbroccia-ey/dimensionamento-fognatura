
declare let JsBarcode: any;

export class PdfUtilities {

    public static toDataUrl(url): Promise<any> {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onload = function (l) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.onerror = function (e) {
                    reject(e);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function (e) {
                alert("Error  occurred while receiving the document.");
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        });
    }

    public static textToBase64Barcode(text: string) {
        if(text === undefined) text = "";
        var canvas = document.createElement("canvas");
        JsBarcode(canvas, text, { format: "CODE128", displayValue: false });
        //TODO: revert png?
        return canvas.toDataURL("image/jpg");
    }

    public static checkUndefined(value: string): string {
        if (value != undefined) {
            if (value != '') {
                return value;
            }
        }
        return " ";
    }
    
    /**
     * Fix data format from YYYYMMGG to GG-MM-YYYY
     * @param value 
     */
    public static fixDataFormat(value: string) {
        if (value != undefined && value != '' && (value.length == 8)) {
            return value.substring(6) + "-" + value.substring(4, 6) + "-" + value.substring(0, 4);
        } else {
            return value;
        }

    }

    /*
    Check if number contains 
    */
    public static checkAndDeleteDecimal(value: string) {
        if (value === undefined || value === "")
            return;
        var index: number = value.indexOf(".");
        var sub: string;
        if (index > -1) {
            sub = value.substring(index + 1);
            for (var i: number = 0; i < sub.length; i++) {
                if (sub.charAt(i) != '0' && sub.charAt(i) != ' ') {
                    return value;
                }
            }
            return value.substring(0, (index));
        } else {
            return value;
        }
    }

}