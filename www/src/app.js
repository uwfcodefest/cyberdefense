/* jshint browser:true */
/* globals PIXI, requestAnimationFrame */
(function() {

    document.addEventListener('DOMContentLoaded', function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Container();

        // create a renderer instance
        var width = screen.availWidth;
        var height = screen.availHeight;
        var renderer = new PIXI.autoDetectRenderer(width, height, {backgroundColor : 0x66FF99});

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimationFrame(animate);

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("asset/bunny.png");

        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // move the sprite to the center of the screen
        bunny.position.x = width / 2;
        bunny.position.y = height / 2;

        stage.addChild(bunny);

        function animate() {
            requestAnimationFrame(animate);

            // just for fun, let's rotate mr rabbit a little
            bunny.rotation += 0.1;

            // render the stage
            renderer.render(stage);
        }
    }, false);

}());
