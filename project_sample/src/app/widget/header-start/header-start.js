var option = {
    init: function () {
        console.log('header-start inited');
    },

    events: {
        'div click': function () {
            alert('div clicked');
        }
    }
};

module.exports = Rosetta.Component(option);