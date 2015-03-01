a = [];
$(document).ready(function() {

    $('#insertionsort').click(function() {
        visualizeInsertionSort(a, 500);
    });

    setUpSortContainer(a);
    initializeRandomizeButton();

});

function initializeRandomizeButton() {
    $('#randomize').click(function() {
        setUpSortContainer();
    });
}


function setUpSortContainer() {
    $('.bar').remove();

    a = [];

    for (var i = 0; i < 20; i++) {
        a.push(Math.floor(Math.random()*50));
    }

    var containerHeight = $(window).height() - 200;
    var containerWidth = $(window).width();
    var maxBarHeight = containerHeight - 10;

    $('#sortContainer').height(containerHeight);

    // put bars on screen;
    var maxValue = Math.max.apply(null, a);
    var nextBar;
    var previousBar;
    var height;
    for (var i = 0; i < a.length; i++) {
        height = ( a[i] / maxValue ) * maxBarHeight;
        if ( height == 0 ) {
            height = 1;
        }

        nextBar = $('<span>').text(a[i]).addClass('bar').addClass('normal').height(height);
        nextBar.css({ 'margin-top': maxBarHeight - height });

        if (i == 0) {
            $('#sortContainer').prepend(nextBar);
        } else {
            nextBar.insertAfter(previousBar);
        }

        previousBar = nextBar;
    }
}

delay = 1000;
function visualizeInsertionSort(a, delayTime) {
    delay = delayTime;
    valueToInsert = 0;
    pickNextValue(a);

/*
    console.log(a.join(", "));
    var valueToInsert;
    for (var i = 1; i < a.length; i++) {
        valueToInsert = i;

        while (valueToInsert > 0 && a[valueToInsert-1] > a[valueToInsert]) {
            swap(a, valueToInsert-1, valueToInsert);
            valueToInsert--;
        }
    }

    console.log(a.join(", "));
    console.log("swaps: " + swaps);
*/
}

valueToInsert = 0;
function pickNextValue(a) {
    valueToInsert++;
    console.log("INDEX=" + valueToInsert);

    if (valueToInsert < a.length) {
       insertNextValue(a);
    } else {
        unhighlightBars();
        // finished, everything is sorted :)
        console.log(a.join(", "));
    }
}

currentHighlightedBar = -1;
function insertNextValue(a) {
    console.log("insertNextValue");
    // highlight the associated bar to insert
    unhighlightBars();
    highlightBar(valueToInsert);

    setTimeout(function() {
        checkSwap(a, valueToInsert);
    }, delay);
}

function checkSwap(a, index) {
    console.log("checkSwap");
    if (index > 0 && a[index-1] > a[index]) {
        // highlightBar(valueToInsert);
        // highlightBar(valueToInsert-1);

        setTimeout(function() {
            visualizeSwap(a, index);
        }, delay);

    } else {
        pickNextValue(a);
    }
}

function visualizeSwap(a, index) {
    console.log("visualizeSwap");
    swap(a, index-1, index);

    // visualization
    swapBar(index-1, index);
    updatedDisplayedSwap();

    index--;

    setTimeout(function() {
        checkSwap(a, index);
    }, delay);
}

swaps = 0;
function swap(a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
    swaps++;
}

function updatedDisplayedSwap() {
    $('#swaps').text(swaps);
}

function highlightBar(i) {
    if (i < 0) console.log("index out of bounds");
    var children = $('#sortContainer').children(':nth-child(' + (i+1) + ')');
    children.removeClass('normal').addClass('highlighted');
}

function unhighlightBars() {
    $('.bar').removeClass('highlighted').addClass('normal');
}

function swapBar(i, j) {
    var b1 = i + 1;
    var b2 = j + 1;

    var bar1 = $('#sortContainer').children(':nth-child(' + b1 + ')');
    var bar2 = $('#sortContainer').children(':nth-child(' + b2 + ')');

    var offset1;
    var offset2;

    if (i < j) {
        offset1 = { left: "40px" };
        offset2 = { left: "-40px" };
    } else {
        offset1 = { left: "-40px" };
        offset2 = { left: "+40px" };
    }

    bar1.animate(offset1, delay);
    bar2.animate(offset2, { duration: delay , complete: function() {
        bar1.insertAfter(bar2);
        bar1.css({ left: 0 });
        bar2.css({ left: 0 });
    }});

}
