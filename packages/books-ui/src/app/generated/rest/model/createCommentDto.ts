/**
 * examples-books-service
 * The Books API description
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface CreateCommentDto { 
    bookId: string;
    content: string;
    byUserId: string;
}