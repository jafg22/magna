/**
 * Created by arch-hyperion on 12/04/16.
 */

$("#trigger").on("click", function(){
    //alert("HEY");
    $.get("codigos/srv.php", {cod:2, append:0},
        function(data, status){
            data = JSON.parse(data);
            //alert(JSON.stringify(data));

            var obj = document.createElement('a'); //Crea elemento a
            obj.href = 'data:'+ data.mime +';base64,' + encodeURI(data.src); //Agregada meta href
            obj.target = '_blank'; //Objetivo -> nueva pestaña
            obj.download = data.nombre; //Nombre para descarga
            document.body.appendChild(obj); //Agrega a DOM
            obj.click(); //Genera click

        });
});

$("#append").on("click", function(){
    //alert("HEY");
    $.get("codigos/srv.php", {cod:1, append:1},
        function(data, status){
            data = JSON.parse(data);
            //alert(JSON.stringify(data));

             var obj = document.createElement('img'); //Crea elemento img
             obj.src = 'data:'+ data.mime +';base64,' + encodeURI(data.src); //Asigna src
             document.body.appendChild(obj); //Agrega a DOM
        });
});