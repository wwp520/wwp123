//
//  GDViewController.m
//  AAAAAA
//
//  Created by RY on 2018/2/12.
//  Copyright © 2018年 RY. All rights reserved.
//

#import "GDViewController.h"

#define ScreenBounds [UIScreen mainScreen].bounds
#define ScreenSize   [UIScreen mainScreen].bounds.size
#define ScreenHeight [UIScreen mainScreen].bounds.size.height
#define ScreenWidth  [UIScreen mainScreen].bounds.size.width

#pragma mark - 声明
@interface GDViewController ()<UIWebViewDelegate>

@property (nonatomic, strong) UIWebView *webview;

@end

#pragma mark - 实现
@implementation GDViewController

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
                NSString *str = [[NSBundle mainBundle] pathForResource:@"申请进度查询结果-中国光大银行信用卡地带手机版" ofType:@"htm"];
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
    // 光大
    NSString *boxLength = [webView stringByEvaluatingJavaScriptFromString:
                          @"document.getElementsByClassName('main')[0].getElementsByClassName('content_box').length"];
    for (int i=0; i<[boxLength integerValue]; i++) {
        // content_box里找所有的c
        NSString *str1 = [NSString stringWithFormat:@"document.getElementsByClassName('main')[0].getElementsByClassName('content_box')[%d].getElementsByClassName('c').length", i];
        NSString *cLength = [webView stringByEvaluatingJavaScriptFromString:str1];
        for (int y=0; y<[cLength integerValue]; y++) {
            NSString *str2 = [NSString stringWithFormat:@"document.getElementsByClassName('main')[0].getElementsByClassName('content_box')[%d].getElementsByClassName('c')[%d].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML", i,y];
            NSString *tr = [webView stringByEvaluatingJavaScriptFromString:str2];
            NSLog(@"%@",tr);
            
            NSString *str3 = [NSString stringWithFormat:@"document.getElementsByClassName('main')[0].getElementsByClassName('content_box')[%d].getElementsByClassName('c')[%d].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML", i,y];
            NSString *tr2 = [webView stringByEvaluatingJavaScriptFromString:str3];
            NSLog(@"%@",tr2);
        }
        
        
//        NSString *str1 = [NSString stringWithFormat:@"document.getElementsByClassName('searchconc')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[%d].getElementsByTagName('td').length",i];
//        NSString *tdLength = [webView stringByEvaluatingJavaScriptFromString:str1];
//        for (int y=0; y<[tdLength integerValue]; y++) {
//            NSString *str2 = [NSString stringWithFormat:@"document.getElementsByClassName('searchconc')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[%d].innerHTML",y];
//            NSString *tdContent = [webView stringByEvaluatingJavaScriptFromString:str2];
//            NSLog(@"%@",tdContent);
//        }
    }
    //
}


@end


