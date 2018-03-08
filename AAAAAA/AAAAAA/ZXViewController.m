//
//  ZXViewController.m
//  AAAAAA
//
//  Created by ouda on 2018/2/26.
//  Copyright © 2018年 RY. All rights reserved.
//
#define kScreenBounds [UIScreen mainScreen].bounds
#define kScreenSize   [UIScreen mainScreen].bounds.size
#define kScreenWidth  [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
#import "ZXViewController.h"

@interface ZXViewController ()<UIWebViewDelegate>
@property (nonatomic, strong) UIWebView *webview;
@end

@implementation ZXViewController

#pragma mark - 初始化
- (void)viewDidLoad {
    [super viewDidLoad];
    [self webview];
}
- (UIWebView *)webview {
    if (!_webview) {
        _webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
        _webview.delegate = self;
        [_webview loadRequest:({
            NSURLRequest *request = [NSURLRequest requestWithURL:({
                NSString *str = [[NSBundle mainBundle] pathForResource:@"申请进度查询" ofType:@"htm"];
                NSURL *url = [NSURL fileURLWithPath:str];
                url;
            })];
            request;
        })];
        [self.view addSubview:_webview];
    }
    return _webview;
}

#pragma mark - UIWebViewDelegate
- (void)webViewDidFinishLoad:(UIWebView *)webView {
    
    //中信
//    NSString *str2 = [webView stringByEvaluatingJavaScriptFromString:
//                              @"document.getElementsByClassName('content')[0].getElementsByTagName('p')[0].getElementsByTagName('i')[0].innerHTML"];
   
    
    NSString *str2 = @"document.getElementsByClassName('content')[0].getElementsByTagName('p')[0].innerHTML";
    
    NSString *tdContent = [webView stringByEvaluatingJavaScriptFromString:str2];
    NSLog(@"%@",tdContent);
}


@end
