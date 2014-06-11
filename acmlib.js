function acmlib (username, password, base_url) {
    
    var public_object = {

        get_person: function (id_or_username, params) 
        {
            return process_request(
                    "GET", make_people_url(id_or_username, params),
                    null, person_model);
        },
   
        get_people: function (params) 
        {
            return process_request(
                    "GET", make_people_url(null, params), null, person_model);
        },

        add_person: function (username, password, name, email, website, params) 
        {
            var data = {
                username: username,
                password: password,
                name: name,
                email: email,
                website: website}

            return process_request(
                    "POST", make_people_url(null, params), data, person_model);
        },

        update_person: function (id_or_username, password, name, email, website, params) 
        {
            var data = {
                username: username,
                password: password,
                name: name,
                email: email,
                website: website}

            return process_request(
                "PUT", make_people_url(id_or_username, params), data, person_model);
        },

        get_event: function (event_id, params) 
        {
            return process_request(
                "GET", make_events_url(event_id, params), null, event_model);
        },

        get_events: function (params) 
        {
            return process_request(
                "GET", make_events_url(null, params), null, event_model);
        },

        add_event: function(title, description, speaker, location, 
                start, end, canceled, hidden, params) 
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
                "POST", make_events_url(null, params), data, event_model);
        },
            
        update_event: function (event_id, title, description, speaker, 
                location, start, end, canceled, hidden, params) 
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
                "POST", make_events_url(event_id, params), data, event_model);
        },

        get_post: function(post_id, params) 
        {
            return process_request(
                    "GET", make_posts_url(post_id, params), null, post_model);
        },

        get_posts: function (params) 
        {
            return process_request(
                "GET", make_posts_url(null, params), null, post_model);
        },

        add_post: function (title, description, content, hidden, params) 
        {
            var data = {
                title: title,
                description: description,
                content: content,
                hidden: hidden}

            return process_request(
                    "POST", make_posts_url(null, params), data, post_model);
        },

        update_post: function(post_id, title, description, content, hidden, params) {

            var data = {
                title: title,
                description: description,
                content: content,
                hidden: hidden}

            return process_request(
                    "POST", make_posts_url(post_id, params), data, post_model);
        },

        get_membership: function(membership_id, params)
        {
            return process_request(
                "GET", make_memberships_url(membership_id, params),
                null, membership_model);
        },

        get_memberships: function(params) 
        {
            return process_request(
                "GET", make_memberships_url(null, params), null, membership_model);
        },

        add_membership: function(person_id, start_date, end_date, params) {

            var data = {
                person_id: person_id,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "POST", make_memberships_url(null, params), data, membership_model);
        },

        update_membership: function(membership_id, person_id, start_date, end_date, params) {

            var data = {
                person_id: person_id,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "PUT", make_memberships_url(membership_id, params), data, 
                    membership_model);
        },

        get_officership: function(officership_id, params) {
            return process_request(
                    "GET", make_officerships_url(officership_id, params),
                    null, officership_model);
        },

        get_officerships: function(params) {
            return process_request(
                    "GET", make_officerships_url(null, params), null, officership_model);
       },

        add_officership: function(person_id, title, start_date, end_date, params) 
        {

            var data = {
                person_id: person_id,
                title: title,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "POST", make_officerships_url(null, params), data, officership_model);
        },

        update_officership: function(officerships_id, person_id, title, start_date, end_date, params) 
        {

            var data = {
                person_id: person_id,
                title: title,
                start_date: start_date,
                end_date: end_date};

            return process_request(
                    "PUT", make_officerships_url(officerships_id, params), data, 
                    officership_model);
        }
    };

    /*
     */

    var base_url = base_url || "http://acm.pdx.edu/api/v1/";
    
    /*
     */

    function make_people_url(id_or_username, params) {
        return make_url([base_url, '/people/', id_or_username], params);
    };

    function make_events_url(event_id, params) {
        return make_url([base_url, '/events/', event_id], params);
    };
    
    function make_posts_url(post_id, params) {
        return make_url([base_url, '/posts/', post_id], params);
    };
    
    function make_memberships_url(membership_id, params) {
        return make_url([base_url, '/memberships/', membership_id], params);
    };

    function make_officerships_url(officership_id, params) {
        return make_url([base_url, '/officerships/', officership_id], params);
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

// Make a url
//
// > make_url(['example.com', 'foo', 'bar'], {'foo':'a', 'bar':'b'})
// 'example.com/foo/bar?foo=a&bar=b'
function make_url(url_parts, params) {
    return join_url_parts(
            remove_undefined_and_null(url_parts)) + join_params(params);
}

// Join the url parts together
//
// Will put a '/' between each item and removes duplicate '/'. The
// resulting url will have a trailing '/' if the last item does.
//
// > join_url_parts(['example.com/', 'foo', '/bar/', '/foobar'])
// 'example.com/foo/bar/foobar'
//
// > join_url_parts(['example.com/', 'foo', '/bar/', '/foobar/'])
// 'example.com/foo/bar/foobar/'
function join_url_parts(url_parts) {
    return url_parts.reduce(function(l, r) {
        return l.toString().replace(/\/$/, '') 
            + '/' + r.toString().replace(/^\//, ''); 
    });
}

// Join params together
//
// Will put a '?' in front. key/value pairs will be join with a
// '=' and all the pair will be seperated with a '&'. If the params
// is null the empty string is returned.
//
// > join_params(undefined)
// ''
// > join_params({})
// ''
// > join_params({'foo': 'a'})
// '?foo=a'
// > join_params({'foo': 'a', 'bar': 'b'})
// '?foo=a&bar=b'
function join_params(params) {
    if (typeof params !== 'undefined') {
        var a = [];
        for (var key in params) {
            a.push(key.toString() + '=' + params[key].toString());
        }
        if (a.length > 0) {
            return '?' + a.reduce(function(l, r) {
                return l.toString() + '&' + r.toString();
            });
        } 
    } 
    return '';
}

// Remove all undefined and null from a list
// > remove_undefined_and_null([1, undefined, 2, 3, null])
// [ 1, 2, 3 ]
function remove_undefined_and_null(list) {
    return list.filter(function(x) { 
        if (typeof x !== undefined && typeof x !== null) {
            return x; 
        }
    });
}
