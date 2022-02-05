
        $(function(){
            //Randomly put puzzle pieces in Pieces
            $('#piecesArea').ready(function(){
                for(var i=1;i<=9;i++){
                    var randPosX = Math.floor((Math.random()*200))
                    var randPosY = Math.floor((Math.random()*200))
                    $('.randomBox:nth-child('+ i +')').css({left:randPosX + "px",top:randPosY+ "px"});
                }                
            })
            //Change the border color of the clicked puzzle piece
            var x;
            var y;
            
            $('.randomBox').click(function(state){
                // store clicked cell
                var clickflag = $(this).attr("clickflag");
                
                // remove all flags first
                $('.randomBox').removeAttr("clickflag");
                $('.randomBox').css("border","2px solid black");

                if(clickflag===undefined){
                    id = $(this).attr("id");
                    // set as selected
                    clickflag = $(this).attr("clickflag","");
                    // draw yellow border
                    $(this).css("border","3px solid yellow")      
                }
                //alert(id)               
                else{
                    id = -1;
                    // set as unselected
                    $(this).removeAttr("clickflag");
                    // remove yellow border and reset
                    $(this).css("border","2px solid black")
                }       
                
            })

            //Hints Button
            var flag = true;
            $('#hint').click(function(){ 
                if(flag){
                    for(var i=1;i<=9;i++){
                        $('.box:nth-child('+ i +')').html("<div>"+i+"</div>")
                        $('.randomBox:nth-child('+ i +')').html("<div>" + i + "</div>")
                        $(".box>div,.randomBox>div").css({"color":"black","width":"20px","height":"30px","background-color":
                        "white","opacity":"0.5","font-size":"30px"})
                        flag=false;
                    }
                }
                else{
                    for(var i=1;i<=9;i++){
                        $('.box:nth-child('+ i +')').html("<div></div>")
                        $('.randomBox:nth-child('+ i +')').html("<div></div>")
                        flag=true;
                    }
                }  
            })

            //Put the selected piece to the selected square right
            
            $('.box').click(function(e){

                var idOfRightSide = $(this).attr("id");
                if($("#"+idOfRightSide).attr("pieceId") !== undefined)
                {
                    var pieceId = $("#"+idOfRightSide).attr("pieceId"); 
                    $("#"+ pieceId).fadeToggle(500).css("display","block");
                    $("#"+ pieceId).css("border","2px solid black")
                    $("#"+idOfRightSide).removeAttr("pieceId");
                    $("#"+idOfRightSide).css("background", "");
                    if($("#"+idOfRightSide).attr("expected") === pieceId)
                    {
                        correctPieceCount--; 
                    }
                }

                if(id !== -1)
                {
                    var image = $("#"+id).css("background");
                    $("#"+idOfRightSide).css("background",image);  
                    $("#"+idOfRightSide).attr("pieceId", id);
                    $("#"+id).fadeOut();
                    
                    if($("#"+idOfRightSide).attr("expected") === id)
                    {
                        correctPieceCount++; 
                    }
                }

                id = -1;
                if(correctPieceCount === 9)
                {
                    $("#message").fadeToggle(2000).delay(3000).css({"display":"block","background-color":"rgba(0,0,0,0.4)"});
                }
            })
        })