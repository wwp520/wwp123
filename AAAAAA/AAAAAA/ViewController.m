//
//  ViewController.m
//  AAAAAA
//
//  Created by RY on 2018/2/12.
//  Copyright © 2018年 RY. All rights reserved.
//

#import "ViewController.h"

#define ScreenBounds [UIScreen mainScreen].bounds
#define ScreenSize   [UIScreen mainScreen].bounds.size
#define ScreenHeight [UIScreen mainScreen].bounds.size.height
#define ScreenWidth  [UIScreen mainScreen].bounds.size.width

#pragma mark - 声明
@interface ViewController ()<UIWebViewDelegate>

@property (nonatomic, strong) UIWebView *webview;

@end

#pragma mark - 实现
@implementation ViewController

#pragma mark - 初始化
- (void)viewDidLoad {
    [super viewDidLoad];
    [self webview];
}
- (UIWebView *)webview {
    if (!_webview) {
        _webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, ScreenHeight)];
        _webview.delegate = self;
        [_webview loadRequest:({
            NSURLRequest *request = [NSURLRequest requestWithURL:({
                NSString *str = [[NSBundle mainBundle] pathForResource:@"浦东发展银行信用卡" ofType:@"html"];
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
    // 浦发
    
    //获取tr的长度
    NSString *trLength = [webView stringByEvaluatingJavaScriptFromString:
                        @"document.getElementsByClassName('searchconc')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr').length"];
    //遍历tr,取出想要信息
    for (int i=1; i<[trLength integerValue]; i++) {
        NSString *str1 = [NSString stringWithFormat:@"document.getElementsByClassName('searchconc')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[%d].getElementsByTagName('td').length",i];
        NSString *tdLength = [webView stringByEvaluatingJavaScriptFromString:str1];
        for (int y=0; y<[tdLength integerValue]; y++) {
            NSString *str2 = [NSString stringWithFormat:@"document.getElementsByClassName('searchconc')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[%d].innerHTML",y];
            NSString *tdContent = [webView stringByEvaluatingJavaScriptFromString:str2];
            NSLog(@"%@",tdContent);
        }
    }
    // 
}


@end

