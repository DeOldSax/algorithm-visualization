a = [];
$(document).ready(function() {

    $('#insertionsort').click(function() {
        visualizeInsertionSort(a, 500);
    });

    $('#mergesort').click(function() {
        visualizeMergeSort(a, 500);
    });

    setUpSortContainer(a);
    initializeRandomizeButton();

    visualizeMergeSort(a, 500);

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
    for (var j = 0; j < a.length; j++) {
        height = ( a[j] / maxValue ) * maxBarHeight;
        if ( height === 0 ) {
            height = 1;
        }

        nextBar = $('<span>').text(a[j]).addClass('bar').addClass('normal').height(height);
        nextBar.css({ 'margin-top': maxBarHeight - height });

        if (j === 0) {
            $('#sortContainer').prepend(nextBar);
        } else {
            nextBar.insertAfter(previousBar);
        }

        previousBar = nextBar;
    }
}


function visualizeMergeSort(a, delayTime) {
    var mergeSort = new MergeSort();
    mergeSort.setUpSortContainer();
//    console.log(mergeSort.sort(a));
    console.log(mergeSort.sort($("#barContainer[number='0']")).text());
}

function MergeSort() {
    var self = this;
    this.containerCounter = 1;
    this.delay = 1000;
    this.animationDuration = 1000;

    this.sort = function(container) {
        var array = container.children();
        var length = array.length;
        if (length <= 1) {
            return container;
        } else {
            var middle = Math.floor(length / 2);
            var left = this.sliceDomHash(array, 0, middle);
            var right = this.sliceDomHash(array, middle, length);

            var barContainer = $('<div></div>').attr({ 'id' : 'barContainerTop', 'number' : self.containerCounter });
            container.prepend(barContainer);
            $("#barContainerTop[number='" + self.containerCounter + "']").prepend(left);
            self.containerCounter++;

            setTimeout(function() {
                barContainer.animate({ 'margin-top' :  70, 'margin-left' : -(array.length/2 * 25) }, self.animationDuration);
            }, self.delay * self.containerCounter);

            var barContainer2 = $('<div></div>').attr({ 'id' : 'barContainerTopRight', 'number' : self.containerCounter });
            barContainer2.insertAfter(barContainer);
            $("#barContainerTopRight[number='" + self.containerCounter + "']").prepend(right);
            self.containerCounter++;

            setTimeout(function() {
                barContainer2.animate({ 'margin-top' : 70, 'margin-right' : -(array.length/2 * 25) }, self.animationDuration);
            }, self.delay * self.containerCounter);

            var leftSortedContainer = this.sort(barContainer);
            var rightSortedContainer = this.sort(barContainer2);
            
            return merge(leftSortedContainer, rightSortedContainer);
        }

        /*
        if (array.length <= 1) {
            return array;
        } else {
            var middle = Math.floor(array.length / 2);
            var left = this.sort(array.slice(0, middle));
            var right = this.sort(array.slice(middle, array.length));
            return merge(left, right);
        }
        */
    };
    merge = function(leftContainer, rightContainer) {
        var left = leftContainer.children();
        var right = rightContainer.children();
        console.log(left);
        console.log(right);

        var newDomArray = $('<div></div>').attr({ 'id' : 'barContainerTop' });
        var order = 0;

        while (left.length !== 0 && right.length !== 0) {
            self.containerCounter++;
            if (parseInt(left[0].innerHTML) <= parseInt(right[0].innerHTML)) {
                var newLeftContainer = $('<div></div>').attr({ 'id' : 'barContainerTop' });
                newLeftContainer.prepend($(left[0]).clone());
                leftContainer.append(newLeftContainer);
                
                newLeftContainer.attr('order', order);
                order++;
                self.animateLeft(newLeftContainer, 70, (left.length + 1)/2 * 25, self.containerCounter);

                newDomArray.append($(newLeftContainer.children()[0]).clone());
                left = self.sliceDomHash(left, 1, left.length);
            } else {
                var newRightContainer = $('<div></div>').attr({ 'id' : 'barContainerTopRight' });
                newRightContainer.prepend($(right[0]).clone());
                rightContainer.append(newRightContainer);

                newRightContainer.attr('order', order);
                order++;
                self.animateRight(newRightContainer, 70, 1 + ((left.length + 4)/2 * 25), self.containerCounter);

                newDomArray.append($(newRightContainer.children()[0]).clone());
                right = self.sliceDomHash(right, 1, right.length);
            }
        }

        while (right.length !== 0) {
            self.containerCounter++;
            var newRightContainer2 = $('<div></div>').attr({ 'id' : 'barContainerTopRight' });
            newRightContainer2.prepend($(right[0]).clone());
            rightContainer.append(newRightContainer2);

            newRightContainer2.attr('order', order);
            order++;
            self.animateRight(newRightContainer2, 70, (right.length + 1)/2 * 25, self.containerCounter);

            newDomArray.append($(newRightContainer2.children()[0]).clone());
            right = self.sliceDomHash(right, 1, right.length);
        }

        while (left.length !== 0) {
            self.containerCounter++;
            var newLeftContainer2 = $('<div></div>').attr({ 'id' : 'barContainerTop' });
            newLeftContainer2.prepend($(left[0]).clone());
            leftContainer.append(newLeftContainer2);
            var marginLeft =  1 + ((left.length + 4)/2 * 25);

            newLeftContainer2.attr('order', order);
            order++;
            self.animateLeft(newLeftContainer2, 70, marginLeft, self.containerCounter);

            newDomArray.append($(newLeftContainer2.children()[0]).clone());
            left = self.sliceDomHash(left, 1, left.length);
        }


        return newDomArray;
        
        /*
        var newArray = [];
        while (left.length !== 0 && right.length !== 0) {
            if (left[0] <= right[0]) {
                newArray.push(left[0]);
                left = left.slice(1, left.length);
            } else {
                newArray.push(right[0]);
                right = right.slice(1, right.length);
            }
        }
        while (left.length !== 0) {
            newArray.push(left[0]);
            left = left.slice(1, left.length);
        }
        while (right.length !== 0) {
            newArray.push(right[0]);
            right = right.slice(1, right.length);
        }
        return newArray;
        */
    };
    this.setUpSortContainer = function() {
        $('#sortContainer').html("");
        a = [];

        for (var i = 0; i < 4; i++) {
            a.push(Math.floor(Math.random()*50));
        }

        var containerHeight = $(window).height() - 200;
        var containerWidth = $(window).width();

        $('#sortContainer').height(containerHeight);

        // put bars on screen;
        var barContainer = $('<div></div>').attr('id', 'barContainer');
        $('#sortContainer').prepend(barContainer);
        $('#barContainer').attr('number', 0);
        
        var nextBar;
        var previousBar;
        var height;
        for (var j = 0; j < a.length; j++) {
            height = 25;
            nextBar = $('<span>').text(a[j]).addClass('bar').addClass('normal').height(height);
            nextBar.css({ 'padding-top': "5px" });

            if (j === 0) {
                $('#barContainer').prepend(nextBar);
            } else {
                nextBar.insertAfter(previousBar);
            }

            previousBar = nextBar;
        }
    };
    this.sliceDomHash = function(array, start, end) {
        var dummy = $('<div></div>');
        for (var i = start; i < end; i++) {
            dummy.append($(array[i]).clone());
        }
        return dummy.children();
    };
    this.animateLeft = function(container, margin1, margin2, counter) {
        setTimeout(function() {
            container.animate({ 'margin-top' : margin1, 'margin-left' : margin2 }, self.animationDuration);
        }, self.delay * counter);
    };
    this.animateRight = function(container, margin1, margin2, counter) {
        setTimeout(function() {
            container.animate({ 'margin-top' : margin1, 'margin-right' : margin2 }, self.animationDuration);
        }, self.delay * counter);
    };
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
