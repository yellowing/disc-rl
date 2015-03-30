(function() {
    var allowSaving = false;
    presentation.printHelp();
    if (allowSaving) {
        if (World.load()) {
            log('Game restored. Welcome back, %s.', world.player);
        } else {
            if (!Save.exists('playedBefore')) {
                presentation.overlay('intro');
                Save.save('playedBefore', true);
            }
            World.reset();
        }
        $(window).unload(function() {
            world.save();
        });
    } else {
        World.reset();
    }

    /* Get things going. */
    display.init();
    world.display();
    world.run();
}());