$(document).ready(function() {
    var i = 0;
    var y = 0;

    if (!!window.performance && window.performance.navigation.type == 2) {
        window.location.reload();
    }
    $('#moda1').modal({
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '0%', // Ending top style attribute
    });
    $('#modal').modal({
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '0%', // Ending top style attribute
    });
    $('#moda').modal({
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '0%', // Ending top style attribute
    });

    $('#follow').click(function() {
        var c = $(this).val();
        var d = $(this).attr("data-value")
        var e = parseInt($(this).attr("name"));
        var me = $(this);

        if (i === 0) {
            i = 1;
            var h = e + 1;
            $(this).text('following' + ' ' + h);
            if (me.data('requestRunning')) {
                return;
            }

            me.data('requestRunning', true);


            $.ajax({
                url: '/op/op/op/' + c + '/' + d,
                type: 'POST',
                complete: function() {
                    me.data('requestRunning', false);
                }
            })

        } else {
            i = 0;
            $(this).text('follow' + ' ' + e);


            if (me.data('requestRunning')) {
                return;
            }

            me.data('requestRunning', true);
            $.ajax({
                url: '/op/op/op1/' + c + '/' + d,
                type: 'POST',
                complete: function() {
                    me.data('requestRunning', false);
                }
            })
        }


    })
    $('.delete').click(function() {
        var ty = $(this).attr("value");
        console.log(ty);
        $.ajax({
            url: '/delete/answer/' + ty,
            type: 'POST',
            complete: function() {
                console.log('delete');
            }
        })
    })

    $('#following').click(function() {

        var c = $(this).val();
        var d = $(this).attr("data-value")
        var e = parseInt($(this).attr("name"));
        var me1 = $(this);
        if (y === 0) {
            y = 1;
            console.log(1);
            var z = e - 1;
            $(this).text('follow' + ' ' + z);

            if (me1.data('requestRunning')) {
                return;
            }

            me1.data('requestRunning', true);

            $.ajax({
                url: '/op/op/op1/' + c + '/' + d,
                type: 'POST',
                complete: function() {
                    me1.data('requestRunning', false);
                }
            })


        } else {

            y = 0;
            $(this).text('following' + ' ' + e);


            if (me1.data('requestRunning')) {
                return;
            }

            me1.data('requestRunning', true);

            $.ajax({
                url: '/op/op/op/' + c + '/' + d,
                type: 'POST',
                complete: function() {
                    me1.data('requestRunning', false);
                }
            })



        }

    })



});