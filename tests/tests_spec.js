describe("acmlib-js test suit", function() {
    
    var lib, server, done, value;

    var async = new AsyncSpec(this);
 
    async.beforeEach(function(done){

        this.lib = acmlib('root', 'password1234', 'http://localhost:5000/');
        this.server = sinon.fakeServer.create();

        done();
    });

    async.afterEach(function(done) {
        this.server.restore(); // Process all requests so far
        done();
    });

    async.it("test get_person", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/people/1",
            [200, { "Content-Type": "application/json" },
            JSON.stringify({ 
                "id": 1, 
                "username": "root", 
                "name": "Root", 
                "website": null, 
                "email": null })
            ]); 


        this.lib.get_person(1).then(
            function(x) {
                expect(x.id).toEqual(1);
                expect(x.username).toEqual('root');
                expect(x.name).toEqual('Root');
                expect(x.website).toEqual(null);
                expect(x.email).toEqual(null);
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_people", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/people/",
            [200, { "Content-Type": "application/json" },
            JSON.stringify([{ 
                "id": 1, 
                "username": "root", 
                "name": "Root", 
                "website": null, 
                "email": null }])
            ]); 


        this.lib.get_people().then(
            function(x) {
                expect(x.length).toEqual(1);
                expect(x[0].id).toEqual(1);
                expect(x[0].username).toEqual('root');
                expect(x[0].name).toEqual('Root');
                expect(x[0].website).toEqual(null);
                expect(x[0].email).toEqual(null);
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_membership", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/memberships/1",
            [200, { "Content-Type": "application/json" },
            JSON.stringify({ 
                "id": 1, 
                'start_date': "2014-10-10",
                'end_date': "2015-10-10",
                'person_id': 1,
                'person': "http://localhost:5000/memberships/1"})
            ]); 


        this.lib.get_membership(1).then(
            function(x) {
                expect(x.id).toEqual(1);
                expect(x.start_date).toEqual('2014-10-10');
                expect(x.end_date).toEqual('2015-10-10');
                expect(x.person_id).toEqual(1);
                expect(x.person).toEqual("http://localhost:5000/memberships/1");
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_memberships", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/memberships/",
            [200, { "Content-Type": "application/json" },
            JSON.stringify([{ 
                "id": 1, 
                'start_date': "2014-10-10",
                'end_date': "2015-10-10",
                'person_id': 1,
                'person': "http://localhost:5000/memberships/1"}])
            ]); 


        this.lib.get_memberships().then(
            function(x) {
                expect(x.length).toEqual(1);
                expect(x[0].id).toEqual(1);
                expect(x[0].start_date).toEqual('2014-10-10');
                expect(x[0].end_date).toEqual('2015-10-10');
                expect(x[0].person_id).toEqual(1);
                expect(x[0].person).toEqual("http://localhost:5000/memberships/1");
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_officership", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/officerships/1",
            [200, { "Content-Type": "application/json" },
            JSON.stringify({ 
                "id": 1, 
                "title": "Vice Chair",
                'start_date': "2014-10-10",
                'end_date': "2015-10-10",
                'person_id': 1,
                'person': "http://localhost:5000/officerships/1"})
            ]); 


        this.lib.get_officership(1).then(
            function(x) {
                expect(x.id).toEqual(1);
                expect(x.title).toEqual("Vice Chair");
                expect(x.start_date).toEqual('2014-10-10');
                expect(x.end_date).toEqual('2015-10-10');
                expect(x.person_id).toEqual(1);
                expect(x.person).toEqual("http://localhost:5000/officerships/1");
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_officerships", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/officerships/",
            [200, { "Content-Type": "application/json" },
            JSON.stringify([{ 
                "id": 1, 
                "title": "Vice Chair",
                'start_date': "2014-10-10",
                'end_date': "2015-10-10",
                'person_id': 1,
                'person': "http://localhost:5000/officerships/1"}])
            ]); 


        this.lib.get_officerships().then(
            function(x) {
                expect(x.length).toEqual(1);
                expect(x[0].id).toEqual(1);
                expect(x[0].title).toEqual("Vice Chair");
                expect(x[0].start_date).toEqual('2014-10-10');
                expect(x[0].end_date).toEqual('2015-10-10');
                expect(x[0].person_id).toEqual(1);
                expect(x[0].person).toEqual("http://localhost:5000/officerships/1");
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_event", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/events/1",
            [200, { "Content-Type": "application/json" },
            JSON.stringify({ 
                'event_id': 1,
                'title': "Event 1",
                'description': "Description 1", 
                'speaker': "Speaker 1",
                'location': "Location 1",
                'editor_id': 1,
                'editor': "http://localhost:5000/people/1",
                'edited_at': "2014-10-10 10:10:10.000000",
                'start': "2015-10-10 10:10:10.000000",
                'end': "2016-10-10 10:10:10.000000",
                'canceled': false,
                'hidden': false,
                'revision': 1})
            ]); 


        this.lib.get_event(1).then(
            function(x) {
                expect(x.event_id).toEqual(1);
                expect(x.title).toEqual("Event 1");
                expect(x.description).toEqual("Description 1"); 
                expect(x.speaker).toEqual("Speaker 1");
                expect(x.location).toEqual("Location 1");
                expect(x.editor_id).toEqual(1);
                expect(x.editor).toEqual("http://localhost:5000/people/1");
                expect(x.edited_at).toEqual("2014-10-10 10:10:10.000000");
                expect(x.start).toEqual("2015-10-10 10:10:10.000000");
                expect(x.end).toEqual("2016-10-10 10:10:10.000000");
                expect(x.canceled).toEqual(false);
                expect(x.hidden).toEqual(false);
                expect(x.revision).toEqual(1);
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_events", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/events/",
            [200, { "Content-Type": "application/json" },
            JSON.stringify([{ 
                'event_id': 1,
                'title': "Event 1",
                'description': "Description 1", 
                'speaker': "Speaker 1",
                'location': "Location 1",
                'editor_id': 1,
                'editor': "http://localhost:5000/people/1",
                'edited_at': "2014-10-10 10:10:10.000000",
                'start': "2015-10-10 10:10:10.000000",
                'end': "2016-10-10 10:10:10.000000",
                'canceled': false,
                'hidden': false,
                'revision': 1}])
            ]); 


        this.lib.get_events().then(
            function(x) {
                expect(x.length).toEqual(1);
                expect(x[0].event_id).toEqual(1);
                expect(x[0].title).toEqual("Event 1");
                expect(x[0].description).toEqual("Description 1"); 
                expect(x[0].speaker).toEqual("Speaker 1");
                expect(x[0].location).toEqual("Location 1");
                expect(x[0].editor_id).toEqual(1);
                expect(x[0].editor).toEqual("http://localhost:5000/people/1");
                expect(x[0].edited_at).toEqual("2014-10-10 10:10:10.000000");
                expect(x[0].start).toEqual("2015-10-10 10:10:10.000000");
                expect(x[0].end).toEqual("2016-10-10 10:10:10.000000");
                expect(x[0].canceled).toEqual(false);
                expect(x[0].hidden).toEqual(false);
                expect(x[0].revision).toEqual(1);
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_post", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/posts/1",
            [200, { "Content-Type": "application/json" },
            JSON.stringify({ 
                'post_id': 1,
                'title': "Post 1",
                'description': "Description 1", 
                'editor_id': 1,
                'editor': "http://localhost:5000/people/1",
                'edited_at': "2014-10-10 10:10:10.000000",
                'content': "Content 1",
                'hidden': false,
                'revision': 1})
            ]); 


        this.lib.get_post(1).then(
            function(x) {
                expect(x.post_id).toEqual(1);
                expect(x.title).toEqual("Post 1");
                expect(x.description).toEqual("Description 1"); 
                expect(x.editor_id).toEqual(1);
                expect(x.editor).toEqual("http://localhost:5000/people/1");
                expect(x.edited_at).toEqual("2014-10-10 10:10:10.000000");
                expect(x.hidden).toEqual(false);
                expect(x.revision).toEqual(1);
                expect(x.content).toEqual("Content 1");
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });

    async.it("test get_posts", function(done) {
        this.server.respondWith("GET", "http://localhost:5000/posts/",
            [200, { "Content-Type": "application/json" },
            JSON.stringify([{ 
                'post_id': 1,
                'title': "Post 1",
                'description': "Description 1", 
                'editor_id': 1,
                'editor': "http://localhost:5000/people/1",
                'edited_at': "2014-10-10 10:10:10.000000",
                'content': "Content 1",
                'hidden': false,
                'revision': 1}])
            ]); 


        this.lib.get_posts().then(
            function(x) {
                expect(x.length).toEqual(1);
                expect(x[0].post_id).toEqual(1);
                expect(x[0].title).toEqual("Post 1");
                expect(x[0].description).toEqual("Description 1"); 
                expect(x[0].editor_id).toEqual(1);
                expect(x[0].editor).toEqual("http://localhost:5000/people/1");
                expect(x[0].edited_at).toEqual("2014-10-10 10:10:10.000000");
                expect(x[0].hidden).toEqual(false);
                expect(x[0].revision).toEqual(1);
                expect(x[0].content).toEqual("Content 1");
                done();
            },
            function(x) {
                expect(false).toBe(true);
                done();
            });

        this.server.respond();
    });
});
