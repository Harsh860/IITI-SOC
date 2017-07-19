$(document).ready(function() {
    var loading = $('.progress');
    $(".button-collapse").sideNav();

    $('#modal1').modal({
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '0%', // Ending top style attribute
    });
    $('#tabs-swipe-demo').tabs({ 'swipeable': true });
    $('ul.tabs').tabs();
    var p = 2;

    $(window).scroll(function() {


        if ($(window).scrollTop() + window.innerHeight == $(document).height()) {
            $.get('/all/question/' + p, function(err1) {

                console.log(err1);
                if (err1.length > 0) {
                    loading.show();
                    console.log('1');
                }

                for (var i = 0; i < err1.length; i++) {
                    var q = '<div class="card-panel grey lighten-5 col s12 m6" id="staggered-test"><span class="black-text text-darken-2"><div class="row"><div class="col s12">';



                    var w = '<b><h2><a href=/' + encodeURIComponent(err1[i].question) + '>' + err1[i].question + '</a></h2></b>';
                    var e = '<p>  <small>asked by</small><small><a href=/op/op/op/' + err1[i].postedBy._id + '>' + err1[i].postedBy.email + '</a></small></p></div></div></span></div>';


                    $('.height').append(q + w + e);


                }

                p = p + 1;
                loading.hide();

            })
        }
    });
});