$(document).ready(function(){
    console.log("ready");
    // Canvas stuff
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    // Lets save the cell width in a variable for easy control
    var cw = 10;
    var d = "right"; //default direction
    var food;
    var score;

    //Lets create the snake now
    var snakeArray; //an array of cells to make up the snake

    function init(){
            d = "right";
            createSnake();
            createFood();
            // finally lets display the score
            score = 0;
            // Lets move the snake now using a timer which will trigger the pain function
                // every 60ms
                if(typeof gameLoop != "undefined") clearInterval(gameLoop);
                gameLoop = setInterval(paint, 60);
        }

        init();


    function createSnake()    {
        var length = 5; // length of snake
        snakeArray = []; //Empty array to start with
        for (var i = length-1; i>=0; i--)
        {
            // This will create a horizontal snake starting from the top left
            snakeArray.push({x: i, y:0});
        }
    }

    // Lets create the food now
    function createFood(){
        food = {
            x: Math.round(Math.random()*(w-cw)/cw),
            y: Math.round(Math.random()*(h-cw)/cw),
        }
        // This will create a cell with x/y between 0-44
        // Because there are 45(450/10) positions across the rows and columns
    }

    // Lets pain the snake now
    function paint()    {
        // To avoid the snake trail we need to pain the BG on every frame
        // Lets pain the canvas now
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0,w,h);

        // The movement code for the snake to come here.
        // The logic is simple
        // Pop out the tail cell and place it infront of the head cell
        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;
        // These were the position of the head cell.
        // We will increment it to get the new head position
        // Lets add proper direction based movement now
        if (d == "right") nx++;
        else if (d == "left") nx--;
        else if (d == "up") ny--;
        else if (d == "down") ny++;

        // Lets add the game over clauses now
        // This will restart the game if the snake hits the wall
        // Lets add the code for body collision
        // Now if the head of the snake bumps into its body, the game will restart
        if (nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || checkCollision(nx, ny, snakeArray))
        {
            // restart the game
            init();
            // Lets organize the code a bit now.
            return;
        }

        // Lets write the code to make the snake eat the food
        // The logic is simple
        // If the new head position matches with that of the food,
        // Create a new head instead of moving the tail
        if(nx == food.x && ny == food.y) {
            var tail = {x: nx, y: ny};
            score++;
            // Create new food
            createFood();
        } else {
            var tail = snakeArray.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }
        // The snake can now eat the food.


        snakeArray.unshift(tail); // puts back the tail as the first cell

        for(var i=0; i < snakeArray.length; i++)
        {
            var c = snakeArray[i];
            // Lets paint 10px wide cells
            paintCell(food.x, food.y);
        }

        // Lets paint the food
        paintCell(food.x, food.y);
        // Lets paint the score
        var scoreText = "Score: " + score;
        ctx.fillText(scoreText, 5, h-5)

    }

    // Lets first create a generic function to draw cells
    function paintCell(x, y){

        ctx.fillStyle = "blue";
        ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);

    }

    function checkCollision(x, y, array) {
        // This function will check if the provided x/y coordinates exist
        // in an array of cells or not
        for(var i = 0; i < array.length; i++) {
            if(array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    // Lets add the keyboard controls now
    $(document).keydown(function(e){
        var key = e.which;
        // We will add another clause to prevent reverse gear
        if (key == "37" && d != "right") d ="left";
        else if (key == "38" && d != "down") d ="up";
        else if (key == "39" && d != "left") d ="right";
        else if (key == "40" && d != "up") d ="down";
        // The snake is now keyboard controllable
    });

})