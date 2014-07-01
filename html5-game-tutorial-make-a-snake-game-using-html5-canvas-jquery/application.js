$(document).ready(function(){
    console.log("ready");
    // Canvas stuff
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    // Lets save the cell width in a variable for easy control
    var cw = 10;

    // Lets paint the canvas now
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    //Lets create the snake now
    var snake_array; //an array of cells to make up the snake

    createSnake();
    function createSnake()
    {
        var length = 5; // length of snake
        snakeArray = []; //Empty array to start with
        for (var i = length-1; i>=0; i--)
        {
            // This will create a horizontal snake starting from the top left
            snakeArray.push({x: i, y:0});
        }
    }

    // Lets pain the snake now
    function paint()
    {
        // To avoid the snake trail we need to pain the BG on every frame

        // The movement code for the snake to come here.
        // The logic is simple
        // Pop out the tail cell and place it infront of the head cell
        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;
        // These were the position of the head cell.
        // We will increment it to get the new head position
        nx++;

        var tail = snakeArray.pop(); //pops out the last cell
        tail.x = nx
        snakeArray.unshift(tail);

        for(var i=0; i < snakeArray.length; i++)
        {
            var c = snakeArray[i];
            // Lets paint 10px wide cells
            ctx.fillStyle = "blue";
            ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
            ctx.strokeStyle = "white";
            ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
        }
    }
    // Lets move the snake now using a timer which will trigger the pain function
    // every 60ms
    game_loop = setInterval(paint, 60);


paint();
})