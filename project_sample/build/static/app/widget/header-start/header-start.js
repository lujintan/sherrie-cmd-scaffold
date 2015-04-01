define('app:widget/header-start/header-start.js', function(require, exports, module){ var option = {
    init: function () {
        console.log('header-start inited');
    },

    events: {
        'div click': function () {
            alert('div clicked');
        }
    }
};

module.exports = Rosetta.Component(option); });