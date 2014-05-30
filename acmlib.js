function acmlib (username, password, base_url) {
    
    var public_object = {

        get_person: function (id_or_username) 
        {
            return process_request(
                    "GET", make_people_url(id_or_username),
                    null, person_model);
        },
   
        get_people: function () 
        {
            return process_request(
                    "GET", make_people_url(), null, person_model);
        },

        add_person: function (username, password, name, email, website) 
        {
            var data = {
                username: username,
                password: password,
                name: name,
                email: email,
                website: website}

            return process_request(
                    "POST", make_people_url(), data, person_model);
        },

        update_person: function (id_or_username, password, name, email, website) 
        {
            var data = {
                username: username,
                password: password,
                name: name,
                email: email,
                website: website}

            return process_request(
                "PUT", make_people_url(id_or_username), data, person_model);
        },

        get_event: function (event_id) 
        {
            return process_request(
                "GET", make_events_url(event_id), null, event_model);
        },

        get_events: function () 
        {
            return process_request(
                "GET", make_events_url(), null, event_model);
        },

        add_event: function(title, description, speaker, location, 
                start, end, canceled, hidden) 
        {
            data = {
                title: title,
                description: description,
                speaker: speaker,
                location: location,
                start: start,
                end: end,
                canceled: canceled,
                hidden: hidden}

            return process_request(
                "POST", make_events_url(), data, event_model);
        },
            
        update_event: function (event_id, title, description, speaker, 
                location, start, end, canceled, hidden) 
        {

            var data = {
                title: title,
                description: description,
                speaker: speaker,
                location: location,
                start: start,
                end: end,
                canceled: canceled,
                hidden: hidden}

            return process_request(
                "POST", make_events_url(event_id), data, event_model);
        },

        get_post: function(post_id) 
        {
            return process_request(
                    "GET", make_posts_url(post_id), null, post_model);
        },

        get_posts: function () 
        {
            return process_request(
                "GET", make_posts_url(), null, post_model);
        },

        add_post: function (title, description, content, hidden) 
        {
            var data = {
                title: title,
                description: description,
                content: content,
                hidden: hidden}

            return process_request(
                    "POST", make_posts_url(), data, post_model);
        },

        update_post: function(post_id, title, description, content, hidden) {

            var data = {
                title: title,
                description: description,
                content: content,
                hidden: hidden}

            return process_request(
                    "POST", make_posts_url(post_id), data, post_model);
        },

        get_membership: function(membership_id)
        {
            return process_request(
                "GET", make_memberships_url(membership_id),
                null, membership_model);
        },

        get_memberships: function() 
        {
            return process_request(
                "GET", make_memberships_url(), null, membership_model);
        },

        add_membership: function(person_id, start_date, end_date) {

            var data = {
                person_id: person_id,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "POST", make_memberships_url(), data, membership_model);
        },

        update_membership: function(membership_id, person_id, start_date, end_date) {

            var data = {
                person_id: person_id,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "PUT", make_memberships_url(membership_id), data, 
                    membership_model);
        },

        get_officership: function(officership_id) {
            return process_request(
                    "GET", make_officerships_url(officership_id),
                    null, officership_model);
        },

        get_officerships: function() {
            return process_request(
                    "GET", make_officerships_url(), null, officership_model);
       },

        add_officership: function(person_id, title, start_date, end_date) {

            var data = {
                person_id: person_id,
                title: title,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "POST", make_officerships_url(), data, officership_model);
        },

        update_officership: function(officerships_id, person_id, title, start_date, end_date) 
        {

            var data = {
                person_id: person_id,
                title: title,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "PUT", make_officerships_url(officerships_id), data, 
                    officership_model);
        }
    };

    /*
     */

    var base_url = base_url || "http://acm.pdx.edu/api/v1/";
    
    /*
     */

    function make_people_url(id_or_username) {
        return make_url([base_url, '/people/', id_or_username]);
    };

    function make_events_url(event_id) {
        return make_url([base_url, '/events/', event_id]);
    };
    
    function make_posts_url(post_id) {
        return make_url([base_url, '/posts/', post_id]);
    };
    
    function make_memberships_url(membership_id) {
        return make_url([base_url, '/memberships/', membership_id]);
    };

    function make_officerships_url(officership_id) {
        return make_url([base_url, '/officerships/', officership_id]);
    };

    /*
     */

    
    function process_request(method, url, data, model) {
        return new RSVP.Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, url, true);

            request.onload = function() {
                if (request.status == 200) {
                    
                    var json = JSON.parse(request.responseText);

                    if ('map' in json) {
                        resolve(json.map(function (x) {
                            x.prototype = model
                            return x;
                        }));
                    } else {
                        json.prototype = model;
                        resolve(json)
                    }

                } else {

                    reject(Error(request.statusText));
                }
            };

            request.onerror = function() {
                reject(Error("Network Error"));
            };

            request.send(data);
        });
    }
    
    /*
     */

    
    /*
     */

    var model = {
    };

    var event_model = Object.create(model, {
    });

    var post_model = Object.create(model, {
    });

    var person_model = Object.create(model, {
    });

    var membership_model = Object.create(model, {
        get_person: function() {
            return public_object.get_person(this.person_id);
        }
    });

    var officership_model = Object.create(model, {
        get_person: function() {
            return public_object.get_person(this.person_id);
        }
    });
    
    /*
     */

    return public_object;
};

function make_url(url_parts) {
    
    // Remove all undefined
    var url_parts = url_parts.filter(
            function(x) { if (typeof x !== undefined) return x; });
    
    // join all the pathname parts together
    return url_parts.reduce(function(l, r) {
        return l.toString().replace(/\/$/, '') 
            + '/' + r.toString().replace(/^\//, ''); 
    });
}

