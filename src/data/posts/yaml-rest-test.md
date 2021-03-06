---
title: YAML Based Automated Spring Boot Testing
date: '2018-11-19'
author: Kamran Khan <kamran.khan@hcl.com>
tags: springboot, rest assured, yaml, json unit
excerpt: Test your REST API without writing any script in any language.
---

This test framework lets you write your test cases in in simple YAML format. Currently only json response is supported. We use JsonPath and JsonUnit and Java regular expression libraries to provide you simple and elegant way of validating your json response. You can select a subset of json response by providing JsonPath expression and/or regular expression then validate it with JsonUnit. You can also combine multiple JsonPath expressions and regular expressions in a Unix like pipe fashion to precisely select a subset of json response and then validate it.

Read below simple example.

```
---
testGroup:
- name: Simple test group
  tests:
  - name: simple test
    request: # Define http request parameters e.g. uri, method, cookie, header
      uri: https://httpbin.org/get?foo=vs1&foo=v2
      method: post # http method get/post/put/delete
      headers: # set headers
        content-type: application/json
        uuid: uuid-1
      cookies: # set cookies
        cookie1: kookie1
        cookie2: kookie2
      body: | # post payload
        {"a":"b"  "c":"d"}
    response: # test response
      status: 200 # test that http response status code 200
      headers: # test header data
        content-type: application/json # test content-type header value is application/json
      cookies: # test cookies data
        cookie1: kookie1 # test cookie1 value is kookie1
        cookie2: kookie2
      body: # test response body
        asserts: # add multiple assert statements
        - select: jsonpath args | jsonpath foo  # use unix like pipe feature to filter http response data in multiple stages
          value: ["vs1","v2"] # expected output
        - select: jsonpath args | jsonpath foo | regex v\d # from the htpp response data get jsonpath expression "args" value then from the output get jsonpah expression "foo" value then from the output run regular expression "v\d"
          value: v2
```

# Quick setup steps
This is a Java Maven project. Java 1.8 and Maven is required. Follow below steps to quickly run sample tests or create your test.
- Clone this project into a directory.
- Run "mvn clean verify" to run sample tests defined in test-1.yaml and test-2.yaml files in "src/test/resources" directory.
- To define your tests create new test files in "src/test/resources" directory and change "server.port", "server.baseURI" and "testFiles" properties in "src/test/resources/configuration.properties" file.

# Extra setup steps
- If you have multiple environments dev, test etc. and you want to create separate set of tests for each environment then create test files for each environment. Create new configuration file with "configuration-environment.properties" where "environment" is the name of environment. Change "server.port", "server.baseURI" and "testFiles" properties value.
- Run "mvn clean verify -Denv=environment" where "environment" is the name of environment to run test.
- If you want to run test from Eclipse IDE then import this maven project into Eclipse and right click "MainTest" class and run it as junit test. This test framework uses Junit5 so Eclipse IDE  Oxygen.2 Release (4.7.2) or higher is supported but you can run test as maven from lower version of Eclipse.

# SSL certificates support
If you are using HTTPS protocol then you need to add certificates in "src/test/resources/configuration.properties" file like follows. Go to references to know how to export certificates. 

```
certificates=certificates/httpbin.cer,certificates/alice.crt, certificates/bob.crt, certificates/carol.crt
```

## How to write test cases?
Quickest way to start is to read "src/test/resources/test-1.yaml" test file.

A test case is a REST API call with HTTP request data to be sent to a server and HTTP response data to be verified by the framework. A test group is a collection of test cases to be executed in a defined sequence.

Basic structure of simple test case is follows:
```
testGroup: # array of test group.
- name: # name of a test group

  tests: # array of test cases
  - name: # name of tes case

    request: # http request data to be sent
      uri: # uri, host name, port are defined in configuration.properties file
      method: #http request method get/post/put/delete
      parameters: # form parameters
        name1: value1 # name value pair
        name2: value2
      headers: # request headers 
        name1: value1 # name value pair
        name2: value2
      cookies: #request cookies
        name1: value1 # name value pair
        name2: value2
      body: value #request body data

    response: #http response data to be verified
      status: # response status code
      headers: # response headers
        name1: value1 # name value pair
        name2: value2
      cookies: #  response cookies
        name1: value1 # name value pair
        name2: value2
      body: # response body data verification
       asserts: # you can write multiple asserts to validate different part of json response
       - select: #jsonpath / reqular expressions
         value: # value to be matched
       - select:
         value: 
```

- Examples - Create test groups

```
testGroup:
  -
     name: first test group
     skip: true/false #if you want to skip this testGroup from execution set value to true/false
  -
     name: second test group
     skip: false
     .....
```

- Example - Create tests

```
testGroup:
  -
     ....
     tests:
            -
                name: first rest call
                request:
                    uri: /cart/get/cart/${cartId} # request uri hostname and port is picked up from baseURI from application.properties file.
                    method: get/post/put/delete # use any of these values
                    headers: # create key value pairs of headers and its values
                        content-type: {$contentType}
                    cookie: # create key value pairs of cookies and its values
                    body: | # send following json as request payload
                        {
                            "a":"b",
                            "c":"d"
                        }
                response:
                    status: ${status} # assert that http response status is 200
                    header: # add key value pairs to assert on header values
                        content-type: {$contentType} #assert that content-type header value
                    body:
                        asserts: # add multiple assert key value pairs
                            -
                                select: jsonpath args.foo # json path expression to be used to get value from response body
                                value: |
                                       [v1,v2] # if the return value from json path is list of atomic values you can match them with comma separated values like this.
                            -
                                select: jsonpath args # json path expression
                                value: | # expected json value
                                    {
                                        "foo": [
                                        "v1",
                                        "v2"
                                        ]
                                    }
                            - 
                                select: jsonpath args | jsonpath foo | regex v\d # from the htpp response data get jsonpath expression "args" value then from the output get jsonpah expression "foo" value then from the output run regular expression "v\d"
                                value: v2
```

## How to use variables. 
Variables can be defined inside the initGroup and they have global scope. You can reference these variables like **${variableName}** in the request header, cookies, body and uri values and response header, cookies and assert values. You can also assign values to these variables from response and refer the value in subsequent tests.
- Example - Define variable :

```
initGroup:
  variables:
    status: 200 #status variable is created with intial value of 200 
    contentType: "application/json" # contentType variable is created with initial value of application/json
    cartId: cid-1001
    uuid: # create uuid variable with null value
    country: US
```

- Example - Use variables

```
testGroup:
  -
     name: ....
     tests:
       -
          request:
            uri: /get/cart/${cartId} # this is how you can use a variable inside uri.
            headers:
              content-type: {$contentType} # send content-type=application/json header in the request
            cookies:
              country: {$country} # send country=US cookie in the request
            response:
              status: {$status} # assert that http response status is 200
            header:
              content-type: {$contentType} #assert that content-type header is application/json
```

  - Example - Assign value to a variable from response.
```
testGroup:
  -
     name: ....
     tests:
       -
          request:
            ....
            response:
              ....
              ....
              variables:
                uuid: header.uuid # assign uuid header value to uuid variable defined in the initGroup. if variable not defined new variable will be created.
                sessionId:  cookie.session-id # assign session-id cookie value to sessionId variable.
                skuId: body.response.skuId # assign value extracted from json response using "response.skuId" JsonPath expression for json path expression refer https://github.com/json-path/JsonPath
```


## How to do Json comparison
Read  https://github.com/lukas-krecan/JsonUnit

## How to write JsonPath expression
Read https://github.com/json-path/JsonPath

## How to write regular expression
https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html

## References
- http://docs.bvstools.com/home/ssl-documentation/exporting-certificate-authorities-cas-from-a-website

## PROJECT DETAILS

- Project URL https://github.com/ERS-HCL/rest-yaml-test

## CONTRIBUTOR(S)

Kamran Khan <kamran.khan@hcl.com>
