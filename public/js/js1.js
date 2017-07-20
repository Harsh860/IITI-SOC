//$(document)
//  .ajaxStart(function() {
//    $loading.show();
//})
//.ajaxStop(function() {
//  $loading.hide();
//});

$(document).ready(function() {
    $(".button-collapse").sideNav();
    var loading = $('.progress');

    var sh = parseInt($('.li').val());
    if (sh <= 10)
        loading.hide();


    var i = 0;
    var p = 2;
    var stop = 0;
    var stop1 = 1;
    console.log(p);
var check=0;
    var err = $('.height').attr('value');
    var er = $('.poiuy').attr('value');

    $(window).scroll(function() {
        if (stop1 > 0 && check==0) {

            if ($(window).scrollTop() + window.innerHeight + 50 > $(document).height() && stop1 > 0) {
                loading.show();
check=1;
                $.get(
                    '/qw/qw/qw/' + p,
                    function(ans) {
                        var l = '';
                        var l1 = '';
                        var k1 = '';
                        var f = '';
                        var g = '';
                        var h = '';
                        var q1 = '';
                        var w1 = '';
                        var r1 = '';
                        var t1 = '';
                        var y1 = '';
                        var u1 = '';
                        stop1 = ans.length;
                        if (ans.length == 0) {

                            loading.hide();
                            console.log('hjjjjjjjjjjjjjj');
                        }
                        for (var j = 0; j < ans.length; j++) {
                            l1 = '<b><h2><a href=/' + encodeURIComponent(ans[j].question) + '>' + ans[j].question + '</a></h2></b><div class="grey lighten-3">';
                            l = '<div class="card-panel grey lighten-5 col s12 m6" id="staggered-test">';
                            //   $('.height').append('<div class="card-panel grey lighten-5 col s12 m6" id="staggered-test"><div class="grey lighten-3">')



                            if (ans[j].answeredBy.img != null) {
                                //   $('.height').append('<img class="gh" src=' + '/' + ans[j].answeredBy.img + " " + '/>')
                                k1 = '<img class="gh" src=' + '/' + ans[j].answeredBy.img + " " + '/>';


                            }
                            f = '<a href=/op/op/op/' + ans[j].answeredBy._id + '>' + ' ' + ans[j].answeredBy.fullname + '</a>';
                            //   $('.height').append('<a href=/op/op/op/' + ans[j].answeredBy._id + '>' + ans[j].answeredBy.fullname + '</a>')
                            if (ans[j].answeredBy.bio != null) {
                                //     $('.container').append(ans[j].answeredBy.bio)
                                h = ans[j].answeredBy.bio;
                            }

                            //       $('.height').append('<br><br>' + ans[j].answer + '</div></div>')
                            //    $('.container').append(ans[j].answer)
                            //  $('.container').append('</div>')
                            //$('.container').append('</div>')
                            g = '<br><br>' + ans[j].answer + '</div><div>';
                            var g1 = '</div></div>';

                            var y = 0;
                            //        console.log('j ' + j);
                            for (var k = 0; k < ans[j].upvotedBy.length; k++) {

                                console.log(er);
                                console.log(ans[j].upvotedBy[k]);
                                console.log(ans[j].upvotedBy[k] == er);
                                if (ans[j].upvotedBy[k] == er) {

                                    y = 1;
                                    console.log('yloop' + 1);

                                    q1 = '<div class = ' + ans[j]._id + '>';
                                    w1 = '<button class="btn y" value=' + ans[j]._id + '     ' + 'data-value=' + ans[j].count + '>upvoted ' + ans[j].count + '</button>';

                                    r1 = '<a href=/comment/' + ans[j]._id + '/' + err + 'class="cmm" data-value=' + ans[j]._id + '>comment</a></div>';



                                    break;

                                }




                            }
                            console.log('y' + y);
                            console.log('ans' + ans[j].upvotedBy.length);
                            if (y === 0 || ans[j].upvotedBy.length == 0) {
                                t1 = '<div class=' + ans[j]._id + '><div class="p"><button class="btn z"   value='

                                y1 = ans[j]._id + ' ' + 'data-value=' + ans[j].count + '>upvote' + ' ' + ans[j].count + '</button>';


                                u1 = '<a href=/comment/' + ans[j]._id + '/err' + 'class="cmm"' + 'data-value=' + ans[j]._id + '>comment</a></div></div>';





                            }
                            console.log('ybottom' + y);
                            $('.height').append(l + l1 + k1 + f + h + g + q1 + w1 + r1 + t1 + y1 + u1 + g1);

                            l = '';
                            l1 = '';
                            k1 = '';
                            f = '';
                            g = '';
                            h = '';
                            q1 = '';
                            w1 = '';
                            r1 = '';
                            t1 = '';
                            y1 = '';
                            u1 = '';
                            console.log(u1);


                        }


                    })
                p = p + 1;
                check=0;

            }
        }
    });

    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#modal1').modal({
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '0%', // Ending top style attribute
    });
    $('#tabs-swipe-demo').tabs({ 'swipeable': true });
    $('ul.tabs').tabs();
    /* $('.next').click(function() {


        var m = $(this);
        if (m.data('requestRunning')) {
            return;
        }
        m.data('requestRunning', true);
        $.get({
                url: '/1/op/' + p,
                complete: function() {
                    m.data('requestRunning', false);
                }


            })
            //  alert($(window).height());
        p = p + 1;
        console.log(p);

    });
*/
    /*  $('.a').click(function() {

          console.log('1');


          var z = '<form class="col s4" id="2" method="POST"><div class="row "><div class="input-field col s12"><input id="first_name" placeholder="Ask a question" type="text" name="question" class="validate"></div></div><div class="form-group"><button class=" btn ">submit</button></div></form>';


          $('.2').prepend(z);
  <% if(err1.length==10){ %>
        <a href=/1/op/<%=pg %> ><button class="btn">next</button></a>
        <% } %>
            <% if(lg>0){ %>
                <a href=/1/op/<%=lg %> ><button class="btn">previous</button></a>
                <% } %>



      });*/
    var i = 0;
    var y = 0;
    $('.height').on('click', '.z', function() {
        console.log('z');
        var me = $(this);


        var c = parseInt($(this).attr("data-value"), 10);
        console.log(me.val());
        if (i === 0) {
            i = 1;
            console.log('1');
            c = c + 1;

            $(this).text('upvoted' + " " + c);


            if (me.data('requestRunning')) {
                return;
            }
            me.data('requestRunning', true);

            var id = $(this).val();

            $.ajax({
                url: '/upvote/' + id,
                type: 'POST',
                complete: function() {
                    me.data('requestRunning', false);
                }

            })


        } else {
            $(this).text('upvote' + " " + c);
            i = 0;
            var id = $(this).val();
            if (me.data('requestRunning')) {
                return;
            }

            me.data('requestRunning', true);

            $.ajax({
                url: '/downvote/' + id,
                type: 'POST',
                complete: function() {
                    me.data('requestRunning', false);
                }


            });




        }
    })


    $('.height').on('click', '.y', function() {
        console.log($(this));
        var me1 = $(this);
        var c = parseInt($(this).attr("data-value"), 10);
        if (y === 0) {
            c = c - 1;
            y = 1;
            $(this).text('upvote' + " " + c);
            if (me1.data('requestRunning')) {
                return;
            }
            me1.data('requestRunning', true);

            console.log('1');

            console.log(c);
            var id = $(this).val();


            $.ajax({
                url: '/downvote/' + id,
                type: 'POST',
                complete: function() {
                    me1.data('requestRunning', false);
                }



            });

        } else {
            $(this).text('upvoted' + " " + c);
            y = 0;
            if (me1.data('requestRunning')) {
                return;
            }
            me1.data('requestRunning', true);

            var id = $(this).val();


            $.ajax({
                url: '/upvote/' + id,
                type: 'POST',
                complete: function() {
                    me1.data('requestRunning', false);
                }



            });


        }
    })





});
