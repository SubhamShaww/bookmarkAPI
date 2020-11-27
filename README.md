*** This is a Bookmark API ***
---

This API is having REST API architecture.

Using this service the user can:

1. bookmark a certain web link (like this
2. https://www.nytimes.com/2020/04/14/us/politics/trump-total-authorityclaim.html)
3. create a tag and attach it to any bookmark (like “politics”)
4. retrieve their bookmarks
5. retrieve their tags
6. manage their bookmarks and tags ( create and delete )

***Functionality supported by the API***
These are the various features supported by the API:

1. Bookmarking
a. Create a Bookmark
b. Delete a Bookmark

2. Tag
a. Create a Tag
b. Delete a Tag
c. Add a Tag to a Bookmark
d. Remove a Tag from a Certain Bookmark

3. Display
a. Retrieve all bookmarks
b. Retrieve all tags

***Bookmark***
Each bookmark will have the following fields:

1. Id: Unique id of the bookmark (something like UUID)
2. Link: Link of the bookmark (Should be unique)
3. Title: Title of the bookmark
4. Time Created: Time when bookmark was created (in epoch time)
5. Time updated: Time when bookmark was updated (in epoch time)
6. Publisher: Publisher of the bookmark
7. Tags: User created tags associated with the given bookmark

Example bookmark:

1. Id: 04bb723a-7f0f-11ea-bc55-0242ac130003 (UUID)
2. Link: https://www.nytimes.com/2020/04/14/us/politics/trump-total-authorityclaim.html
3. Title: Trump’s Claim of Total Authority in Crisis Is Rejected Across Ideological Lines
4. Time Created: 1586951349
5. Time Updated: 1586951349
6. Publisher: The New York Times
7. Tags: 5defccc0-7f0f-11ea-bc55-0242ac130003

***Tag***
Each tag will have the following fields:

1. Id: Unique id of the tag (something like UUID)
2. Title: Title of the tag (Should be unique)
3. Time Created: Time when tag was created (in epoch time)
4. Time Updated: Time when tag was created (in epoch time)

Example tag:

1. Id: 5defccc0-7f0f-11ea-bc55-0242ac130003
2. Title: politics
3. Time Created: 1586951571
4. Time Updated: 1586951571