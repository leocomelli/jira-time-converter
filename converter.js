$(document).ready(function() {

    function JiraTimeConverter(startField, endField, resultField) {
        this.startField = startField;
        this.endField = endField;
        this.resultField = resultField;

        this.init = function(){
            startField.setMask('time');
            endField.setMask('time');

            startField.keyup(function () {
                if($(this).val().length == $(this).attr('max')) {
                    $(this).next().focus();
                }
            });

            context = this;
            endField.keyup(function () {
                if($(this).val().length == $(this).attr('max')) {
                    context.evaluateTime();
                }
            });

            startField.focus();
        }

        this.evaluateTime = function() {
            if(!this.isValidDate(this.startField.val()) &&
                this.fieldsAreFilled(this.startField, this.endField)){
                alert('Invalid start time');
                return;
            }

            if(!this.isValidDate(this.endField.val()) &&
                this.fieldsAreFilled(this.startField, this.endField)){
                alert('Invalid end time');
                return;
            }

            var startFields = this.startField.val().split(':');
            var endFields = this.endField.val().split(':');

            var start = new Date(2000, 0, 1, startFields[0], startFields[1]);
            var end = new Date(2000, 0, 1, endFields[0], endFields[1]);

            if(end <= start){
                alert('Start time is greater than or equal to end time');
                return;
            }

            if(this.fieldsAreFilled(this.startField, this.endField)){
                var diff = end - start;
                var diffAsDecimalTime = diff/1000/60/60;

                var msec = diff;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);

                hour = hh > 0 ? hh + "h " : "";
                min = mm > 0 ? mm + "m" : "";
                this.resultField.val(hour + min);

                /* Copy to clipboard */
                this.resultField.select()
                document.execCommand("Copy")
                $('.alert').show();

            }
        }

        this.fieldsAreFilled = function(start, end) {
		    return start != '' && end != '';
	    }

	    this.isValidDate = function(date) {
		    return /^((\d)|(0\d)|(1\d)|(2[0-3]))\:((\d)|([0-5]\d))$/.test(date);
	    }
    }

    jtc = new JiraTimeConverter($('#startTime'), $('#endTime'), $('#jiraTime'));
    jtc.init();
});
