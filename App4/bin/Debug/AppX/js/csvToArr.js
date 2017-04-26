



let csvToArr = (function () {

    let parsedData;
    
    let displayParsedData = () => {
        for (var i = 0; i < 100 ; i++) {
            for (var j = 0; j < 100 ; j++) {
                Debug.write(parsedData[i][j] + ",");
            }
            Debug.writeln();
        }
    }

    class csvToArr {
        constructor() {

            parsedData = new Array(100).fill().map(() => new Array(100));
        
            $.ajax({
                type: "GET",
                url: "../level_info/worldMap_kanion.csv",
                dataType: "text",
                success: function (data) {

                    var j = 0;
                    var innerI = 0;
                    var NumberSubString = "";
                    for (var i = 0; i < data.length; i++) {

                    
                        if (data[i] != ';') {

                            if (data[i] != ',') {
                                NumberSubString += data[i];
                            } else {
                            
                                parsedData[j][innerI] = Number.parseInt(NumberSubString);
                                innerI++;
                                NumberSubString = "";
                            }
                       
                        } else {
                            parsedData[j][innerI] = Number.parseInt(NumberSubString);
                            innerI++;
                            NumberSubString = "";

                            innerI = 0;

                            j++;
                        }
                    }
                 
                   
                }

            });

       

        }

        returnParsedData() {
            return parsedData;
        }



     
    }

    return csvToArr;

}());
