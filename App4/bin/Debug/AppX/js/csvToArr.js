



let csvToArr = (function () {

    class csvToArr {
        constructor(levelName) {
            $.ajax({
                type: "GET",
                url: "../level_info/kanion.csv",
                dataType: "text",
                success: function (data) {
                    // Debug.writeln(data);
                    var j = 0;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === ';') {
                            Debug.writeln("x");
                            j++;
                        }
                    }
                    Debug.writeln(j);
                
                }
            });



        }
    }

    return csvToArr;

}());
